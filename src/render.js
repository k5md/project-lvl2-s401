import _ from 'lodash';


const indent = (level, str) => '  '.repeat(level) + str;

const stringify = (object) => {
  if (_.isObject(object)) {
    return _
      .toPairs(object)
      .map(([key, value]) => `${key}: ${stringify(value)}`);
  }
  return object;
};

const renderIter = (level, ast) => {
  const sign1 = '-';
  const sign2 = '+';

  const diffStrings = ast.map(({
    key, value1: rawValue1, value2: rawValue2, type, children,
  }) => {
    if (children) return indent(level + 1, `${key}: {\n${(renderIter(level + 2, children))}\n${indent(level + 1, '}')}`);

    const value1 = stringify(rawValue1);
    const value2 = stringify(rawValue2);

    switch (type) {
      case 'same': {
        return indent(level + 1, `${key}: ${value1}`);
      }
      case 'different': {
        return [indent(level, `${sign1} ${key}: ${value1}`), indent(level, `${sign2} ${key}: ${value2}`)];
      }
      case 'existsOnlyInFirst': {
        return indent(level, `${sign1} ${key}: ${value1}`);
      }
      case 'existsOnlyInSecond': {
        return indent(level, `${sign2} ${key}: ${value2}`);
      }
      default:
        return;
    }
  });

  return _.flatten(diffStrings).join('\n');
};

const render = (ast) => {
  return `{\n${renderIter(1, ast)}\n}`;
};

export default render;
