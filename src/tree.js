import _ from 'lodash';

const createTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const result = keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        type: 'recursion',
        key,
        value: createTree(obj1[key], obj2[key]),
      };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { type: 'removed', key, value: obj1[key] };
    }
    if (!Object.hasOwn(obj1, key)) {
      return { type: 'added', key, value: obj2[key] };
    }
    if (obj1[key] === obj2[key]) {
      return { type: 'norm', key, value: obj1[key] };
    }
    return {
      type: 'reupdated',
      key,
      value: obj1[key],
      value2: obj2[key],
    };
  });
  return result;
};

export default createTree;
