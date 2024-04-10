const plain = (arr, paths = '') => {
  let steck = '';
  let reupdateVal = '';
  arr.forEach((obj) => {
    const {
      type, key, val, children,
    } = obj;
    const valType = typeof val === 'string' ? `'${val}'` : val;
    const typeVal = typeof valType === 'object' && valType !== null ? '[complex value]' : valType;
    let path = paths;
    if (type === 'added') {
      path += path.length ? `${'.'}${key}` : key;
      steck += `${'Property'} '${path}' ${'was added with value:'} ${typeVal}\n`;
    }
    if (type === 'reupdated') {
      reupdateVal = typeVal;
    }
    if (type === 'updated') {
      path += path.length ? `${'.'}${key}` : key;
      steck += `${'Property'} '${path}' ${'was updated. From'} ${reupdateVal} ${'to'} ${typeVal}\n`;
    }
    if (type === 'removed') {
      path += path.length ? `${'.'}${key}` : key;
      steck += `${'Property'} '${path}' ${'was removed'}\n`;
    }
    if (type === 'recursion') {
      path += path.length ? `${'.'}${key}` : key;
      steck += plain(children, path);
    }
  });
  return steck;
};

export default plain;
