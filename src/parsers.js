import jsYaml from 'js-yaml';
import _ from 'lodash';

const parsers = {
  yaml: jsYaml.load,
  yml: jsYaml.load,
  json: JSON.parse,
};

export default (ext) => {
  if (!_.has(parsers, ext)) {
    throw new Error(`There is no parser for file extension "${ext}"`);
  }

  return _.get(parsers, ext);
};
