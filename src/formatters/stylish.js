import _ from 'lodash';

const getLvlIndent = (repeatCount, sign = ' ') => `${'    '.repeat(repeatCount)}  ${sign} `;

const serialize = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const nested = _.keys(value).map(
    (key) => `${getLvlIndent(depth - 1)}${key}: ${serialize(value[key], depth + 1)}`,
  );

  return `{\n${nested.join('\n')}\n${getLvlIndent(depth - 2)}}`;
};

const format = ({ name, value, type }, lvl) => {
  const typeFormatters = {
    added: () => `${getLvlIndent(lvl - 1, '+')}${name}: ${serialize(value, lvl + 1)}`,
    removed: () => `${getLvlIndent(lvl - 1, '-')}${name}: ${serialize(value, lvl + 1)}`,
    changed: () => (
      [
        `${getLvlIndent(lvl - 1, '-')}${name}: ${serialize(value[0], lvl + 1)}`,
        `${getLvlIndent(lvl - 1, '+')}${name}: ${serialize(value[1], lvl + 1)}`,
      ]
        .join('\n')
    ),
    unchanged: () => `${getLvlIndent(lvl - 1)}${name}: ${serialize(value, lvl)}`,
  };

  return _.get(typeFormatters, type)();
};

const build = (tree, lvl) => (
  tree.map((node) => {
    if (node.type === 'tree') {
      const treeValue = build(node.children, lvl + 1);
      return `${getLvlIndent(lvl - 1)}${node.name}: {\n${treeValue}\n${getLvlIndent(lvl - 1)}}`;
    }

    return format(node, lvl);
  })
    .join('\n')
);

export default (ast) => `{\n${build(ast, 1)}\n}`;
