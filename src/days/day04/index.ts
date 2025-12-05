/**
 * Advent of Code 2025 - Day 4
 */

import { Grid, Point } from '../../lib/index.js';

export function part1(input: string): number {
  const grid = Grid.fromString(input);
  console.debug(grid.toString());

  const accessable: Point[] = getAccessiblePoints(grid);
  return accessable.length;
}

export function part2(input: string): number {
  const grid = Grid.fromString(input);
  console.debug(grid.toString());

  let rollsRemoved = 0;
  let noMoreAccessible = false;

  while (!noMoreAccessible) {
    console.debug('\n');
    const accessable: Point[] = getAccessiblePoints(grid);
    for (const point of accessable) {
      grid.set(point, '.');
      rollsRemoved++;
    }

    if (accessable.length === 0) {
      noMoreAccessible = true;
    }

    console.debug(grid.toString());
  }

  return rollsRemoved;
}

function getAccessiblePoints(grid: Grid<string>): Point[] {
  const accessable: Point[] = [];

  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const point = new Point(x, y);
      if (!isPaperRoll(grid.get(point))) {
        continue;
      }
      const neighbours = grid.neighborsWithFilter(point, isPaperRoll, true);
      if (neighbours.length < 4) {
        accessable.push(point);
      }
    }
  }
  return accessable;
}

function isPaperRoll(value: unknown): value is '@' {
  return value === '@';
}
