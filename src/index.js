import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';

const format = (key, value, sign, indentation = '  ') => {
  if (sign) return `${indentation}${sign} ${key}: ${value}`;
  return `${indentation}${indentation}${key}: ${value}`;
};

const genDiff = (filepath1, filepath2) => {
  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');

  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);

  const parsedContent1 = parse(extension1)(content1);
  const parsedContent2 = parse(extension2)(content2);

  const modificationSign1 = '-';
  const modificationSign2 = '+';

  const keysMerged = _.union(Object.keys(parsedContent1), Object.keys(parsedContent2));
  const diff = keysMerged.reduce((acc, key) => {
    if (parsedContent1[key] === parsedContent2[key]) {
      return [...acc, format(key, parsedContent1[key])];
    }

    if (_.has(parsedContent1, key) && _.has(parsedContent2, key)) {
      return [
        ...acc,
        format(key, parsedContent2[key], modificationSign2),
        format(key, parsedContent1[key], modificationSign1),
      ];
    }

    return _.has(parsedContent1, key)
      ? [...acc, format(key, parsedContent1[key], modificationSign1)]
      : [...acc, format(key, parsedContent2[key], modificationSign2)];
  }, []);

  return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;
