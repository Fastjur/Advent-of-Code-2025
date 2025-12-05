/**
 * Advent of Code 2025 - Day 4
 */

import { parseLines } from '../../lib/utils.js';

export function part1(input: string): number {
  const lines = parseLines(input);
  console.debug(lines);
  const ranges = [];

  const newLineIdx = lines.findIndex((val) => val === '');

  for (const line of lines.slice(0, newLineIdx)) {
    console.debug(line);
    const split = line.split('-');
    ranges.push({
      start: parseInt(split[0]),
      // eslint-disable-next-line perfectionist/sort-objects
      end: parseInt(split[1]),
    });
  }
  console.debug(ranges);

  const ingredientIds: number[] = [];
  for (const line of lines.slice(newLineIdx + 1)) {
    ingredientIds.push(parseInt(line));
  }
  console.debug(ingredientIds);

  const freshIngredientIds: number[] = [];
  for (const ingredientId of ingredientIds) {
    for (const range of ranges) {
      if (ingredientId >= range.start && ingredientId <= range.end) {
        freshIngredientIds.push(ingredientId);
        break;
      }
    }
  }

  console.log(freshIngredientIds);
  return freshIngredientIds.length;
}

export function part2(input: string): number {
  throw new Error('Not implemented yet');
}
