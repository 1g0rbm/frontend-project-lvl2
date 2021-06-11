import _ from 'lodash';
import {
  getAddedValue, getName, getRemovedValue, getType, getValue, isTreeType,
} from '../astDiff.js';

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

const format = (node, lvl) => {
  const typeFormatters = {
    added: () => `${getLvlIndent(lvl, '+')}${getName(node)}: ${serialize(getValue(node), lvl + 1)}`,
    removed: () => `${getLvlIndent(lvl, '-')}${getName(node)}: ${serialize(getValue(node), lvl + 1)}`,
    changed: () => (
      [
        `${getLvlIndent(lvl, '-')}${getName(node)}: ${serialize(getRemovedValue(node), lvl + 1)}`,
        `${getLvlIndent(lvl, '+')}${getName(node)}: ${serialize(getAddedValue(node), lvl + 1)}`,
      ]
        .join('\n')
    ),
    unchanged: () => `${getLvlIndent(lvl)}${getName(node)}: ${serialize(getValue(node), lvl)}`,
  };

  return _.get(typeFormatters, getType(node))();
};

export default (ast) => {
  const iter = (tree, lvl) => (
    tree.map((node) => {
      if (isTreeType(node)) {
        const treeValue = `${iter(getValue(node), lvl + 1)}`;
        return `${getLvlIndent(lvl)}${getName(node)}: {\n${treeValue}\n${getLvlIndent(lvl)}}`;
      }

      return format(node, lvl);
    })
      .join('\n')
  );

  return `{\n${iter(ast, 1)}\n}`;
};
