import _ from 'lodash';

const possibleNodeTypes = ['added', 'removed', 'changed', 'unchanged', 'tree'];

const makeNode = (name, value, type) => {
  if (!possibleNodeTypes.includes(type)) {
    throw new Error(`Undefined ast diff node type "${type}"`);
  }

  return { name, value, type };
};

const createKeysMap = (firstTree, secondTree) => (
  _.union(Object.keys(firstTree), Object.keys(secondTree))
    .map((key) => key.toString())
    .sort()
);

const buildDiffAst = (firstTree, secondTree) => createKeysMap(firstTree, secondTree)
  .map((key) => {
    if (!_.has(firstTree, key)) {
      return makeNode(key, _.get(secondTree, key), 'added');
    }

    if (!_.has(secondTree, key)) {
      return makeNode(key, _.get(firstTree, key), 'removed');
    }

    const firstValue = _.get(firstTree, key);
    const secondValue = _.get(secondTree, key);

    if (_.isObject(firstValue) && _.isObject(secondValue)) {
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
