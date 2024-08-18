import { Point } from '../types';

export function polygonStringToPointList(polygon: string): readonly Point[] {
  // not very robust, but good enough for now
  const values = polygon.match(/\d+(?:\.\d*)?/g) ?? undefined;
  if (values === undefined) {
    return [];
  }

  if (values.length % 2 !== 0) {
    throw new Error('Invalid polygon string.');
  }

  const points: Point[] = [];
  for (let i = 0; i < values.length; i += 2) {
    const x = parseFloat(values[i]);
    const y = parseFloat(values[i + 1]);
    const point: Point = { x, y };
    points.push(point);
  }

  return points;
}

export function pointListToPolygonString(points: readonly Point[]): string {
  const pointsStr = points
    .map((point) => `(${point.x}, ${point.y})`)
    .join(', ');

  return `(${pointsStr})`;
}
