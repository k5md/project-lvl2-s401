import _ from 'lodash';

const indent = (level, str) => ' '.repeat(level) + str;

const stringify = (level, object) => {
  if (!_.isObject(object)) {
    return object;
  }
  return _.toPairs(object).map(([key, value]) => `{\n${indent(level + 6, '')}${key}: ${stringify(level, value)}\n${indent(level, '  }')}`);
};

const renderIter = (level, ast) => {
  const operations = {
    composite: ({ key, children }) => `  ${key}: ${renderIter(level + 4, children)}`,
    changed: ({ key, value: [value1, value2] }) => [`- ${key}: ${stringify(level, value1)}`, `+ ${key}: ${stringify(level, value2)}`],
    removed: ({ key, value }) => `- ${key}: ${stringify(level, value)}`,
    added: ({ key, value }) => `+ ${key}: ${stringify(level, value)}`,
    unchanged: ({ key, value }) => `  ${key}: ${stringify(level, value)}`,
  };

  const diffStringsRaw = ast.map(node => operations[node.type](node));
  const diffStrings = _.flatten(diffStringsRaw).map(string => indent(level, string));

  return `{\n${diffStrings.join('\n')}\n${indent(level - 2, '}')}`;
};

const render = ast => renderIter(2, ast);

export default render;
