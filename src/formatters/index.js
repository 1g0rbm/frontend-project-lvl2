import _ from 'lodash';
import stylish from './stylish.js';

const formatters = {
  stylish,
};

const render = (astDiff, format) => {
  if (!_.has(formatters, format)) {
    throw new Error(`Format "${format}" is invalid.`);
  }

  return _.get(formatters, format)(astDiff);
};

export default render;
