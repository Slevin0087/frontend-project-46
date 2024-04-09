const json = (arrAst) => {
  const result = {};
  arrAst.forEach((ast) => {
    if (ast.type === 'added') {
      result[`+ ${ast.key}`] = ast.val;
    }
    if (ast.type === 'removed') {
      result[`- ${ast.key}`] = ast.val;
    }
    if (ast.type === 'norm') {
      result[`  ${ast.key}`] = ast.val;
    }
    if (ast.type === 'reupdated') {
      result[`- ${ast.key}`] = ast.val;
    }
    if (ast.type === 'updated') {
      result[`+ ${ast.key}`] = ast.val;
    }
    if (ast.type === 'recursion') {
      result[` ${ast.key}`] = json(ast.children);
    }
  });
  return result;
};

const arrArr = [
  {
    type: 'recursion',
    key: 'common',
    children: [
      { type: 'added', key: 'follow', val: false },
      { type: 'norm', key: 'setting1', val: 'Value 1' },
      { type: 'removed', key: 'setting2', val: 200 },
      { type: 'reupdated', key: 'setting3', val: true },
      { type: 'updated', key: 'setting3', val: null },
      { type: 'added', key: 'setting4', val: 'blah blah' },
      { type: 'added', key: 'setting5', val: { key5: 'value5' } },
      { type: 'recursion',
        key: 'setting6',
        children: [
          {
            type: 'recursion',
            key: 'doge',
            children: [
              { type: 'reupdated', key: 'wow', val: '' },
              { type: 'updated', key: 'wow', val: 'so much' },
            ] },
          { type: 'norm', key: 'key', val: 'value' },
          { type: 'added', key: 'ops', val: 'vops' },
        ] }
    ]
  },
  {
    type: 'recursion',
    key: 'group1',
    children: [
      { type: 'reupdated', key: 'baz', val: 'bas' },
      { type: 'updated', key: 'baz', val: 'bars' },
      { type: 'norm', key: 'foo', val: 'bar' },
      { type: 'reupdated', key: 'nest', val: { key: 'value' } },
      { type: 'updated', key: 'nest', val: 'str' },
    ]
  },
  {
    type: 'removed',
    key: 'group2',
    val: { abc: 12345, deep: { id: 45 } }
  },
  {
    type: 'added',
    key: 'group3',
    val: { deep: { id: { number: 45 } }, fee: 100500 }
  }
]

console.log(json(arrArr));

export default json;
