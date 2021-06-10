import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
};

const render = (astDiff, format) => {
  if (!_.has(formatters, format)) {
    throw new Error(`Format "${format}" is invalid.`);
  }

  return _.get(formatters, format)(astDiff);
};

export default render;
