import _ from 'lodash';

const stringify = (object) => {
  /*
    42 => 42
    null => null
    blah blah => 'blah blah'
    [object Object] => [complex value]
  */
  const dataTypes = [
    {
      predicate:
        value => _.isNumber(value) || _.isBoolean(value) || _.isNull(value) || _.isUndefined(value),
      stringifier: value => value,
    },
    {
      predicate: value => _.isObject(value),
      stringifier: () => '[complex value]',
    },
    {
      predicate: value => _.isString(value),
      stringifier: value => `'${value}'`,
    },
  ];

  const { stringifier } = _.find(dataTypes, ({ predicate }) => predicate(object));

  return stringifier(object);
};

const renderProperty = (key, ancestry) => `'${[...ancestry, key].join('.')}'`;

const render = (ast, ancestry = []) => {
  const operations = {
    composite: ({ key, children }) => render(children, [...ancestry, key]),
    changed: ({ key, value: [value1, value2] }) => `Property ${renderProperty(key, ancestry)} was updated. From ${stringify(value1)} to ${stringify(value2)}`,
    removed: ({ key }) => `Property ${renderProperty(key, ancestry)} was removed`,
    added: ({ key, value }) => `Property ${renderProperty(key, ancestry)} was added with value: ${stringify(value)}`,
    unchanged: () => '',
  };

  const diffStrings = ast.map(node => operations[node.type](node)).filter(string => string);

  return diffStrings.join('\n');
};

export default render;
