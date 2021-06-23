import _ from 'lodash';

const getLvlIndent = (cnt, sign = ' ') => `${'    '.repeat(cnt - 1)}  ${sign} `;

const serialize = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const nested = _.keys(value).map(
    (key) => `${getLvlIndent(depth)}${key}: ${serialize(value[key], depth + 1)}`,
  );

  return `{\n${nested.join('\n')}\n${getLvlIndent(depth - 1)}}`;
};

const format = ({ name, value, type }, lvl) => {
  const typeFormatters = {
    added: () => `${getLvlIndent(lvl, '+')}${name}: ${serialize(value, lvl + 1)}`,
    removed: () => `${getLvlIndent(lvl, '-')}${name}: ${serialize(value, lvl + 1)}`,
    changed: () => (
      [
        `${getLvlIndent(lvl, '-')}${name}: ${serialize(value[0], lvl + 1)}`,
        `${getLvlIndent(lvl, '+')}${name}: ${serialize(value[1], lvl + 1)}`,
      ]
        .join('\n')
    ),
    unchanged: () => `${getLvlIndent(lvl)}${name}: ${serialize(value, lvl)}`,
  };

  return _.get(typeFormatters, type)();
};

const build = (tree, lvl) => (
  tree.map((node) => {
    if (node.type === 'tree') {
      const treeValue = build(node.children, lvl + 1);
      return `${getLvlIndent(lvl)}${node.name}: {\n${treeValue}\n${getLvlIndent(lvl)}}`;
    }

    return format(node, lvl);
  })
    .join('\n')
);

export default (ast) => `{\n${build(ast, 1)}\n}`;
