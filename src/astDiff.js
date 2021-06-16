import _ from 'lodash';

const possibleNodeTypes = ['added', 'removed', 'changed', 'unchanged', 'tree'];

const makeNode = (name, value, type) => {
  if (!possibleNodeTypes.includes(type)) {
    throw new Error(`Undefined ast diff node type "${type}"`);
  }

  return { name, value, type };
};

const makeChildrenNode = (name, children) => ({ name, children, type: 'tree' });

const createKeysMap = (firstTree, secondTree) => (
  _.orderBy(_.union(Object.keys(firstTree), Object.keys(secondTree)))
    .map((key) => key.toString())
);

const objDoesNotHaveKey = (key, obj) => !_.has(obj, key);

const areTheseObj = (first, second) => _.isPlainObject(first) && _.isPlainObject(second);

const buildDiffAst = (firstObj, secondObj) => createKeysMap(firstObj, secondObj)
  .map((key) => {
    const firstValue = _.get(firstObj, key);
    const secondValue = _.get(secondObj, key);

    if (objDoesNotHaveKey(key, firstObj)) {
      return makeNode(key, secondValue, 'added');
    }

    if (objDoesNotHaveKey(key, secondObj)) {
      return makeNode(key, firstValue, 'removed');
    }

    if (areTheseObj(firstValue, secondValue)) {
      return makeChildrenNode(
        key,
        buildDiffAst(firstValue, secondValue),
      );
    }

    if (!_.isEqual(firstValue, secondValue)) {
      return makeNode(key, [firstValue, secondValue], 'changed');
    }

    return makeNode(key, firstValue, 'unchanged');
  });

export default buildDiffAst;
