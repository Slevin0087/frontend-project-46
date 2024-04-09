import json from './json.js';

const stylish = (arr) => JSON.stringify(json(arr), null, 2).replace(/"(- |\+ )?([^"]+)":/g, '$1$2:');

export default stylish;
