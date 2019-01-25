import _ from 'lodash';

const indent = (level, str) => '  '.repeat(level) + str;

const stringify = (level, object) => {
  if (_.isObject(object)) {
    return _
      .toPairs(object)
      .map(([key, value]) => `{\n${indent(level + 3, '')}${key}: ${stringify(level, value)}\n${indent(level + 1, '}')}`);
  }
  return object;
};

const operations = {
  hasChildren:
    (level, { key, children }) => indent(level + 1, `${key}: {\n${(renderIter(level + 2, children))}\n${indent(level + 1, '}')}`),
  same:
    (level, { key, value1 }) => indent(level + 1, `${key}: ${value1}`),
  different:
    (level, { key, value1, value2 }) => [indent(level, `- ${key}: ${stringify(level, value1)}`), indent(level, `+ ${key}: ${stringify(level, value2)}`)],
  existsOnlyInFirst:
    (level, { key, value1 }) => indent(level, `- ${key}: ${stringify(level, value1)}`),
  existsOnlyInSecond:
    (level, { key, value2 }) => indent(level, `+ ${key}: ${stringify(level, value2)}`),
};

const renderIter = (level, ast) => {
  const diffStrings = ast.map(node => operations[node.type](level, node));

  return _.flatten(diffStrings).join('\n');
};

const render = ast => `{\n${renderIter(1, ast)}\n}`;

export default render;
