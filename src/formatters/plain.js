import _ from 'lodash';
import {
  getAddedValue,
  getName,
  getRemovedValue,
  getValue,
  isAddedType,
  isChangedType,
  isRemovedType,
  isTreeType,
} from '../astDiff.js';

const serialize = (value) => {
  if (!_.isObject(value)) {
    return typeof value === 'string' ? `'${value}'` : value;
  }

  return '[complex value]';
};

export default (ast) => {
  const iter = (tree, path = null) => (
    tree
      .map((node) => {
        const fieldPath = path ? `${path}.${getName(node)}` : getName(node);
        if (isAddedType(node)) {
          return `Property '${fieldPath}' was added with value: ${serialize(getValue(node))}`;
        }
        if (isRemovedType(node)) {
          return `Property '${fieldPath}' was removed`;
        }
        if (isChangedType(node)) {
          const removed = serialize(getRemovedValue(node));
          const added = serialize(getAddedValue(node));
          return `Property '${fieldPath}' was updated. From ${removed} to ${added}`;
        }
        if (isTreeType(node)) {
          return iter(getValue(node), fieldPath).join('\n');
        }

        return null;
      })
      .filter((line) => line !== null)
  );

  return iter(ast).join('\n');
};
