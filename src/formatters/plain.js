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
  const iter = (tree, path = []) => (
    tree
      .map((node) => {
        const newPath = [...path, node.name];
        if (node.type === 'tree') {
          return iter(node.children, newPath).join('\n');
        }

        return format(newPath.join('.'), node);
      })
      .filter((line) => line !== null)
  );

  return iter(ast).join('\n');
};
