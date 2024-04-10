const typeValue = (value) => {
  const type = typeof value;
  if (type === 'object' && value !== null) {
    return '[complex value]';
  }
  if (type === 'string' && value !== null) {
    return `'${value}'`;
  }
  if (value === '' && String(value) === 'null') {
    return '';
  }
  return value;
};

const plain = (arr, paths = '') => {
  let steck = '';
  let reupdateVal;
  arr.forEach((obj) => {
    let path = paths;
    if (obj.type === 'added') {
      path += path.length ? `${'.'}${obj.key}` : obj.key;
      steck += `${'Property'} '${path}' ${'was added with value:'} ${typeValue(obj.val)}\n`;
    }
    if (obj.type === 'reupdated') {
      reupdateVal = typeValue(obj.val);
    }
    if (obj.type === 'updated') {
      path += path.length ? `${'.'}${obj.key}` : obj.key;
      steck += `${'Property'} '${path}' ${'was updated. From'} ${reupdateVal} ${'to'} ${typeValue(obj.val)}\n`;
    }
    if (obj.type === 'removed') {
      path += path.length ? `${'.'}${obj.key}` : obj.key;
      steck += `${'Property'} '${path}' ${'was removed'}\n`;
    }
    if (obj.type === 'recursion') {
      path += path.length ? `${'.'}${obj.key}` : obj.key;
      steck += plain(obj.children, path);
    }
  });
  return steck;
};

export default plain;
