import plain from './plain.js';
import stylish from './stylish.js';

const getFormatterTree = (obj, format) => {
  switch (format) {
    case 'stylish':
      return stylish(obj);
    case 'plain':
      return plain(obj);
    case 'json':
      return JSON.stringify(obj, null, ' ');
    default:
      throw new Error(`Unkown format ${format}`);
  }
};

export default getFormatterTree;
