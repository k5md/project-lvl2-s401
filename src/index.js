import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';
import render from './render';

const genDiff = (filepath1, filepath2) => {
  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');

  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);

  const parsedContent1 = parse(extension1)(content1);
  const parsedContent2 = parse(extension2)(content2);

  const predicates = {
    hasChildren: (object1, object2, key) => _.isObject(object1[key]) && _.isObject(object2[key]),
    existsOnlyInFirst: (object1, object2, key) => _.has(object1, key) && !_.has(object2, key),
    existsOnlyInSecond: (object1, object2, key) => _.has(object2, key) && !_.has(object1, key),
    same: (object1, object2, key) => _.has(object1, key)
      && _.has(object2, key)
      && object1[key] === object2[key],
    different: (object1, object2, key) => _.has(object1, key)
      && _.has(object2, key)
      && object1[key] !== object2[key],
  };

  const makeAst = (object1, object2) => {
    const mergedKeys = _.union(Object.keys(object1), Object.keys(object2));

    return mergedKeys.map((key) => {
      const value1 = object1[key];
      const value2 = object2[key];
      const type = _.findKey(predicates, predicate => predicate(object1, object2, key));
      const children = type === 'hasChildren' ? makeAst(value1, value2) : null;

      return {
        key,
        value1,
        value2,
        type,
        children,
      };
    });
  };

  const ast = makeAst(parsedContent1, parsedContent2);
  const diff = render(ast);
  return diff;
};

export default genDiff;
