import {
  getAddedValue,
  getName,
  getRemovedValue,
  getValue,
  isAddedType,
  isChangedType,
  isRemovedType,
  isUnchangedType,
} from '../astDiff';

const getLvlIndent = (lvl) => '   '.repeat(lvl);

export default (ast) => {
  const iter = (acc, tree, lvl) => (
    tree.map((node) => {
      if (isAddedType(node)) {
        return `${acc}${getLvlIndent(lvl)} + ${getName(node)}: ${getValue(node)}`;
      }
      if (isRemovedType(node)) {
        return `${acc}${getLvlIndent(lvl)} - ${getName(node)}: ${getValue(node)}`;
      }
      if (isUnchangedType(node)) {
        return `${acc}${getLvlIndent(lvl)}   ${getName(node)}: ${getValue(node)}`;
      }
      if (isChangedType(node)) {
        return [
          `${acc}${getLvlIndent(lvl)} - ${getName(node)}: ${getRemovedValue(node)}`,
          `${acc}${getLvlIndent(lvl)} + ${getName(node)}: ${getAddedValue(node)}`,
        ].join('\n');
      }

      const treeValue = `{\n${iter('', getValue(node), lvl + 1).join('\n')}\n ${getLvlIndent(lvl)}}`;
      return `${acc}${getLvlIndent(lvl)} + ${getName(node)}: ${treeValue}`;
    })
  );

  return `{\n${iter('', ast, 1).join('\n')}\n}`;
};
