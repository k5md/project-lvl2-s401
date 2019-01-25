import _ from 'lodash';

const indent = (level, str) => ' '.repeat(level) + str;

const stringify = (level, object) => {
  if (_.isObject(object)) {
    return _.toPairs(object).map(([key, value]) => `{\n${indent(level + 6, '')}${key}: ${stringify(level, value)}\n${indent(level, '  }')}`);
  }
  return object;
};

const renderIter = (level, ast) => {
  const operations = {
    composite:
      ({ key, children }) => indent(level, `  ${key}: ${renderIter(level + 4, children)}`),
    changed:
      ({ key, value: [value1, value2] }) => [
        indent(level, `- ${key}: ${stringify(level, value1)}`),
        indent(level, `+ ${key}: ${stringify(level, value2)}`),
      ],
    removed: //
      ({ key, value }) => indent(level, `- ${key}: ${stringify(level, value)}`),
    added:
      ({ key, value }) => indent(level, `+ ${key}: ${stringify(level, value)}`),
    unchanged:
      ({ key, value }) => indent(level, `  ${key}: ${stringify(level, value)}`),
  };

  const diffStrings = ast.map(node => operations[node.type](node));

  return `{\n${_.flatten(diffStrings).join('\n')}\n${indent(level - 2, '}')}`;
};

const render = ast => renderIter(2, ast);

export default render;
