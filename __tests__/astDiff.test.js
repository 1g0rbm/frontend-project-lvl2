import { test, expect } from '@jest/globals';
import buildDiffAst from '../src/astDiff';

test('makeNode test', () => {
  const first = {
    a: 'AA',
    b: 'BB',
    c: {
      d: 'DD',
      e: 'EE',
    },
  };

  const second = {
    a: 'AA',
    c: {
      e: 'DD',
      f: 'FF',
    },
    g: 'GG',
  };

  expect(buildDiffAst(first, second))
    .toStrictEqual([
      {
        name: 'a',
        type: 'unchanged',
        value: 'AA',
      },
      {
        name: 'b',
        type: 'removed',
        value: 'BB',
      },
      {
        name: 'c',
        type: 'tree',
        children: [
          {
            name: 'd',
            type: 'removed',
            value: 'DD',
          },
          {
            name: 'e',
            type: 'changed',
            value: [
              'EE',
              'DD',
            ],
          },
          {
            name: 'f',
            type: 'added',
            value: 'FF',
          },
        ],
      },
      {
        name: 'g',
        type: 'added',
        value: 'GG',
      },
    ]);
});
