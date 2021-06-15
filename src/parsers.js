import jsYaml from 'js-yaml';
import _ from 'lodash';

const parsers = {
  yaml: jsYaml.load,
  yml: jsYaml.load,
  json: JSON.parse,
};

export default (content, format) => {
  if (!_.has(parsers, format)) {
    throw new Error(`There is no parser for file extension "${format}"`);
  }

  return _.get(parsers, format)(content);
};
