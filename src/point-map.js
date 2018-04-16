/**
 * Immutable unordered Map like interface of point to value pairs.
 *
 * @flow
 */
import * as Types from "./types";

export type PointMap<T> = {
  [row: number]: {
    [column: number]: T
  }
};

/** Sets the value for point in map */
export function set<T>(
  point: Types.Point,
  value: T,
  map: PointMap<T>
): PointMap<T> {
  return {
    ...map,
    [point.row]: {
      ...map[point.row],
      [point.column]: value
    }
  };
}

/** Gets the value for point in map */
export function get<T>(
  point: Types.Point,
  map: PointMap<T>
): typeof undefined | T {
  return map[point.row] && map[point.row][point.column];
}

/** Checks if map has point assigned to value */
export function has<T>(point: Types.Point, map: PointMap<T>): boolean {
  return (
    map[point.row] !== undefined && map[point.row][point.column] !== undefined
  );
}

/** Creates a new PointMap instance from an array-like or iterable object. */
export function from<T>(pairs: [Types.Point, T][]): PointMap<T> {
  return pairs.reduce((acc, [point, value]) => set(point, value, acc), {});
}

/** Returns the number of elements in a PointMap object. */
export function size(map: PointMap<*>): number {
  return Object.values(map).reduce(
    (acc, row) => acc + Object.keys(row).length,
    0
  );
}