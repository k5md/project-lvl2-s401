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

const renderIter = (level, ast, operations) => {
  const diffStrings = ast.map(node => operations[node.type](level, node));

  return _.flatten(diffStrings).join('\n');
};

const operations = {
  composite:
    (level, { key, children }) => indent(level + 1, `${key}: {\n${(renderIter(level + 2, children, operations))}\n${indent(level + 1, '}')}`),
  changed:
    (level, { key, value: [value1, value2] }) => [indent(level, `- ${key}: ${stringify(level, value1)}`), indent(level, `+ ${key}: ${stringify(level, value2)}`)],
  removed:
    (level, { key, value }) => indent(level, `- ${key}: ${stringify(level, value)}`),
  added:
    (level, { key, value }) => indent(level, `+ ${key}: ${stringify(level, value)}`),
  unchanged:
    (level, { key, value }) => indent(level, `  ${key}: ${stringify(level, value)}`),
};

const render = ast => `{\n${renderIter(1, ast, operations)}\n}`;

export default render;
