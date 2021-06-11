import _ from 'lodash';
import {
  getAddedValue, getName, getRemovedValue, getType, getValue, isTreeType,
} from '../astDiff.js';

const serialize = (value) => {
  if (!_.isObject(value)) {
    return typeof value === 'string' ? `'${value}'` : value;
  }

  return '[complex value]';
};

const format = (path, node) => {
  const typeFormatters = {
    added: () => `Property '${path}' was added with value: ${serialize(getValue(node))}`,
    removed: () => `Property '${path}' was removed`,
    changed: () => {
      const removed = serialize(getRemovedValue(node));
      const added = serialize(getAddedValue(node));
      return `Property '${path}' was updated. From ${removed} to ${added}`;
    },
    unchanged: () => null,
  };

  return _.get(typeFormatters, getType(node))();
};

export default (ast) => {
  const iter = (tree, path = null) => (
    tree
      .map((node) => {
        const fieldPath = path ? `${path}.${getName(node)}` : getName(node);
        if (isTreeType(node)) {
          return iter(getValue(node), fieldPath).join('\n');
        }

        return format(fieldPath, node);
      })
      .filter((line) => line !== null)
  );

  return iter(ast).join('\n');
};
