import _ from 'lodash';


const indent = (level, str) => '  '.repeat(level) + str;
const stringify = (object) => {
  if (_.isObject(object)) {
    return _
      .toPairs(object)
      .map(([key, value]) => `${key}: ${value}`);
  }
  return object;
};

const render = (ast) => {
  const firstSign = '-';
  const secondSign = '+';

  const diffStrings = ast.map(({
    key, value1: rawValue1, value2: rawValue2, type, children,
  }) => {
    if (children) return `    ${key}: ${render(children)}`;

    const value1 = stringify(rawValue1);
    const value2 = stringify(rawValue2);

    switch (type) {
      case 'same': {
        return `    ${key}: ${value1}`;
      }
      case 'different': {
        return `  ${firstSign} ${key}: ${value1}\n  ${secondSign} ${key}: ${value2}`;
      }
      case 'existsOnlyInFirst': {
        return `  ${firstSign} ${key}: ${value1}`;
      }
      case 'existsOnlyInSecond': {
        return `  ${secondSign} ${key}: ${value2}`;
      }
      default:
        return;
    }
  });

  return `{\n${diffStrings.join('\n')}\n}`;
};

export default render;
