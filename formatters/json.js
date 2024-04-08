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
      result[`${ast.key}`] = json(ast.children);
    }
  });
  return result;
};

export default json;
