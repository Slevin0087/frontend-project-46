import _ from 'lodash';

const gap = ' ';
const space = 4;

const getStringOfValue = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const leftSpace = gap.repeat(space);
  const spaceInDepth = gap.repeat(space * depth);
  const keysOfNestedValue = Object.keys(value);
  const res = keysOfNestedValue.map((key) => {
    const nestedValue = getStringOfValue(value[key], depth + 1);
    return `${leftSpace}${spaceInDepth}${key}: ${nestedValue}`;
  });
  return `{\n${res.join('\n')}\n${spaceInDepth}}`;
};

const stylish = (data) => {
  const leftSpace = 2;
  const iter = (node, depth) => {
    const replacer = gap.repeat(space * depth - leftSpace);
    const collOfStrings = node.map(({
      type, key, val, children,
    }) => {
      switch (type) {
        case 'recursion':
          return `${replacer}  ${key}: {\n${iter(children, depth + 1)}\n${replacer}  }`;
        case 'removed':
          return `${replacer}- ${key}: ${getStringOfValue(val, depth)}`;
        case 'added':
          return `${replacer}+ ${key}: ${getStringOfValue(val, depth)}`;
        case 'norm':
          return `${replacer}  ${key}: ${getStringOfValue(val, depth)}`;
        case 'reupdated':
          return `${replacer}- ${key}: ${getStringOfValue(val, depth)}`;
        case 'updated':
          return `${replacer}+ ${key}: ${getStringOfValue(val, depth)}`;
        default:
          throw new Error('Unknown format');
      }
    });
    return collOfStrings.join('\n');
  };
  return `{\n${iter(data, 1)}\n}`;
};

export default stylish;
