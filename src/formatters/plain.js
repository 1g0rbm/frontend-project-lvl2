import _ from 'lodash';

const serialize = (value) => {
  if (!_.isObject(value)) {
    return typeof value === 'string' ? `'${value}'` : value;
  }

  return '[complex value]';
};

const format = (path, { value, type }) => {
  const typeFormatters = {
    added: () => `Property '${path}' was added with value: ${serialize(value)}`,
    removed: () => `Property '${path}' was removed`,
    changed: () => {
      const removed = serialize(value[0]);
      const added = serialize(value[1]);
      return `Property '${path}' was updated. From ${removed} to ${added}`;
    },
    unchanged: () => null,
  };

  return _.get(typeFormatters, type)();
};

export default (ast) => {
  const iter = (tree, path = null) => (
    tree
      .map((node) => {
        const fieldPath = path ? `${path}.${node.name}` : node.name;
        if (node.type === 'tree') {
          return iter(node.value, fieldPath).join('\n');
        }

        return format(fieldPath, node);
      })
      .filter((line) => line !== null)
  );

  return iter(ast).join('\n');
};
