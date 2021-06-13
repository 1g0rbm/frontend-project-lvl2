import { test, expect } from '@jest/globals';
import buildDiffAst from '../../src/astDiff';
import json from '../../src/formatters/json';

test('json formatter test', () => {
  const ast = buildDiffAst({
    l: 'LL',
    c: {
      q: {
        o: 'OO',
        j: null,
      },
      a: 'AA',
      v: 'VV',
      e: 'EE',
    },
  },
  {
    c: {
      q: {
        j: 'JJ',
      },
      a: 'AA',
      e: 'NN',
      z: 'ZZ',
    },
    g: 'GG',
  });

  expect(json(ast)).toBe(JSON.stringify(ast));
});
