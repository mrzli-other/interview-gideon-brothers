import { Point } from '../types';
import { pointListToPolygonString, polygonStringToPointList } from './geometry';

describe('geometry', () => {
  describe('polygonStringToPointList()', () => {
    interface Example {
      readonly input: string;
      readonly expected: readonly Point[];
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: '',
        expected: [],
      },
      {
        input: '()',
        expected: [],
      },
      {
        input: '((0, 0), (1, 0), (1, 1), (0, 1))',
        expected: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 0, y: 1 },
        ],
      },
      {
        input: '((0,0),(1,0),(1,1),(0,1))',
        expected: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 0, y: 1 },
        ],
      },
      {
        input: '((0.2, 0.3), (1.1, 0.3), (1.2, 1.4), (0.5, 1.7))',
        expected: [
          { x: 0.2, y: 0.3 },
          { x: 1.1, y: 0.3 },
          { x: 1.2, y: 1.4 },
          { x: 0.5, y: 1.7 },
        ],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = polygonStringToPointList(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('pointListToPolygonString()', () => {
    interface Example {
      readonly input: readonly Point[];
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: [],
        expected: '()',
      },
      {
        input: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 0, y: 1 },
        ],
        expected: '((0, 0), (1, 0), (1, 1), (0, 1))',
      },
      {
        input: [
          { x: 0.2, y: 0.3 },
          { x: 1.1, y: 0.3 },
          { x: 1.2, y: 1.4 },
          { x: 0.5, y: 1.7 },
        ],
        expected: '((0.2, 0.3), (1.1, 0.3), (1.2, 1.4), (0.5, 1.7))',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = pointListToPolygonString(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
