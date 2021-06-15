import jsYaml from 'js-yaml';
import _ from 'lodash';

const parsers = {
  yaml: jsYaml.load,
  yml: jsYaml.load,
  json: JSON.parse,
};

export default (content, fileFormat) => {
  if (!_.has(parsers, fileFormat)) {
    throw new Error(`There is no parser for file extension "${fileFormat}"`);
  }

  return _.get(parsers, fileFormat)(content);
};
