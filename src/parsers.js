import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const getParser = (extension) => {
  if (!_.has(parsers, extension)) {
    throw new Error('unsupported extension');
  }
  return toParse => parsers[extension](toParse);
};

export default getParser;
