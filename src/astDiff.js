import _ from 'lodash';

const possibleNodeTypes = ['added', 'removed', 'changed', 'unchanged', 'tree'];

export const getType = (node) => node.type;

export const isChangedType = (node) => node.type === 'changed';

export const isTreeType = (node) => node.type === 'tree';

export const getName = (node) => node.name;

export const getValue = (node) => {
  const possibleTypes = ['added', 'removed', 'unchanged', 'tree'];
  if (!possibleTypes.includes(getType(node))) {
    throw new Error(`Node type "${getType(node)}" is not possible for function.`);
  }

  return node.value;
};

const getChangedValue = (node, type) => {
  if (!isChangedType(node)) {
    throw new Error('Only "changed" type is possible for this function.');
  }

  return type === 'added' ? node.value[1] : node.value[0];
};

export const getRemovedValue = (node) => getChangedValue(node, 'removed');

export const getAddedValue = (node) => getChangedValue(node, 'added');

const makeNode = (name, value, type) => {
  if (!possibleNodeTypes.includes(type)) {
    throw new Error(`Undefined ast diff node type "${type}"`);
  }

  return { name, value, type };
};

const createKeysMap = (firstTree, secondTree) => (
  _.orderBy(_.union(Object.keys(firstTree), Object.keys(secondTree)))
    .map((key) => key.toString())
);

const treeDoesNotHaveKey = (key, tree) => !_.has(tree, key);

const areTheseObj = (first, second) => _.isObject(first) && _.isObject(second);

const buildDiffAst = (firstTree, secondTree) => createKeysMap(firstTree, secondTree)
  .map((key) => {
    const firstValue = _.get(firstTree, key);
    const secondValue = _.get(secondTree, key);

    if (treeDoesNotHaveKey(key, firstTree)) {
      return makeNode(key, secondValue, 'added');
    }

    if (treeDoesNotHaveKey(key, secondTree)) {
      return makeNode(key, firstValue, 'removed');
    }

    if (areTheseObj(firstValue, secondValue)) {
      return makeNode(
        key,
        buildDiffAst(firstValue, secondValue),
        'tree',
      );
    }

    if (firstValue !== secondValue) {
      return makeNode(key, [firstValue, secondValue], 'changed');
    }

    return makeNode(key, firstValue, 'unchanged');
  });

export default buildDiffAst;
