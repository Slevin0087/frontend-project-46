import json from './json.js';

const stylish = (arr) => JSON.stringify(json(arr), null, 2).replace(/("|'|,)/gm, '');

export default stylish;
