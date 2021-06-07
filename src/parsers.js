import jsYaml from 'js-yaml';
import _ from 'lodash';

const parsers = {
  yaml: (input) => jsYaml.load(input),
  json: (input) => JSON.parse(input),
};

export default (ext) => {
  if (!_.has(parsers, ext)) {
    throw new Error(`There is no parser for file extension "${ext}"`);
  }

  return _.get(parsers, ext);
};
