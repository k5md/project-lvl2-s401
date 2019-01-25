import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parsers';
import getRenderer from './renderers';

const makeNode = (key, value, type, children = []) => ({
  key,
  value,
  type,
  children,
});

const makeAst = (object1, object2) => {
  const mergedKeys = _.union(Object.keys(object1), Object.keys(object2));

  const nodeTypes = [
    {
      predicate: key => _.isObject(object1[key]) && _.isObject(object2[key]),
      construct: key => makeNode(key, null, 'composite', makeAst(object1[key], object2[key])),
    },
    {
      predicate: key => _.has(object1, key) && !_.has(object2, key),
      construct: key => makeNode(key, object1[key], 'removed'),
    },
    {
      predicate: key => _.has(object2, key) && !_.has(object1, key),
      construct: key => makeNode(key, object2[key], 'added'),
    },
    {
      predicate: key => _.has(object1, key) && _.has(object2, key) && object1[key] !== object2[key],
      construct: key => makeNode(key, [object1[key], object2[key]], 'changed'),
    },
    {
      predicate: key => _.has(object1, key) && _.has(object2, key) && object1[key] === object2[key],
      construct: key => makeNode(key, object1[key], 'unchanged'),
    },
  ];

  return mergedKeys.map((key) => {
    const { construct } = _.find(nodeTypes, ({ predicate }) => predicate(key));
    return construct(key);
  });
};

const genDiff = (filepath1, filepath2, format) => {
  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');

  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);

  const contentObject1 = getParser(extension1)(content1);
  const contentObject2 = getParser(extension2)(content2);

  const diff = makeAst(contentObject1, contentObject2);
  const renderedDiff = getRenderer(format)(diff);

  return renderedDiff;
};

export default genDiff;
