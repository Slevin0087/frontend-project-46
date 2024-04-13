import _ from 'lodash';

const getStringValue = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (typeof data !== 'string') {
    return String(data);
  }
  return `'${data}'`;
};

const plain = (data) => {
  const iter = (node, currentKey) => {
    const result = node.map(({
      type, key, value, value2,
    }) => {
      switch (type) {
        case 'recursion':
          return iter(value, `${currentKey}${key}.`);
        case 'removed':
          return `Property '${currentKey}${key}' was removed\n`;
        case 'added':
          return `Property '${currentKey}${key}' was added with value: ${getStringValue(value)}\n`;
        case 'reupdated':
          return `Property '${currentKey}${key}' was updated. From ${getStringValue(value)} to ${getStringValue(value2)}\n`;
        case 'norm':
          return null;
        default:
          throw new Error('Unknown format');
      }
    });
    return `${result.join('')}`;
  };
  return iter(data, '').trim();
};

export default plain;
