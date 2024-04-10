const typeValue = (value) => {
  // const len = value.length;
  // console.log(len);
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
// console.log('typeValue:', typeValue(''));

const plain = (arr, paths = '') => {
  let steck = '';
  let reupdateVal;
  arr.forEach((obj) => {
    // const {
    //   type, key, val, children,
    // } = obj;
    // console.log('val:', val);
    // const valType = typeof val === 'string' ? `'${val}'` : val;
    // console.log('valType:', valType);
    // const typeVal = typeof valType === 'object' && valType !== null ? '[complex value]' : valType;
    let path = paths;
    if (obj.type === 'added') {
      path += path.length ? `${'.'}${obj.key}` : obj.key;
      steck += `${'Property'} '${path}' ${'was added with value:'} ${typeValue(obj.val)}\n`;
    }
    if (obj.type === 'reupdated') {
      // console.log('val:', obj.val);
      // console.log('typeval:', typeof obj.val);

      reupdateVal = typeValue(obj.val);
      // console.log("val === '' ?", reupdateVal === obj.val);
      // typeValue(obj.val === `${''}` ? '' : obj.val);
      // console.log('reupdateVal:', reupdateVal);
    }
    if (obj.type === 'updated') {
      // console.log('reupdateValUpdated:', reupdateVal);
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
