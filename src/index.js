import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';

const format = (key, value, sign, indentation = '  ') => {
  if (sign) return `${indentation}${sign} ${key}: ${value}`;
  return `${indentation}${indentation}${key}: ${value}`;
};

const genDiff = (firstConfig, secondConfig) => {
  const firstFile = fs.readFileSync(path.resolve(firstConfig), 'utf-8');
  const secondFile = fs.readFileSync(path.resolve(secondConfig), 'utf-8');

  const firstExtension = path.extname(firstConfig);
  const secondExtension = path.extname(secondConfig);

  const firstJson = parse(firstExtension)(firstFile);
  const secondJson = parse(secondExtension)(secondFile);

  const firstModSign = '-';
  const secondModSign = '+';

  const keysMerged = _.union(Object.keys(firstJson), Object.keys(secondJson));
  const diff = keysMerged.reduce((acc, key) => {
    if (firstJson[key] === secondJson[key]) {
      return [...acc, format(key, firstJson[key])];
    }

    if (_.has(firstJson, key) && _.has(secondJson, key)) {
      return [
        ...acc,
        format(key, secondJson[key], secondModSign),
        format(key, firstJson[key], firstModSign),
      ];
    }

    return _.has(firstJson, key)
      ? [...acc, format(key, firstJson[key], firstModSign)]
      : [...acc, format(key, secondJson[key], secondModSign)];
  }, []);

  return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;
