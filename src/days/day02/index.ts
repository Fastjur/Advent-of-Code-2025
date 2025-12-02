/**
 * Advent of Code 2025 - Day 1
 */

import { sum } from '../../lib/utils.js';

export function part1(input: string): number {
  // Parse input
  const lines = input.trim().split('\n');
  const ranges = lines[0].split(',').map((rangeString) => {
    const split = rangeString.split('-');
    return [parseInt(split[0]), parseInt(split[1])];
  });

  console.debug(ranges);

  const invalidIds: number[] = [];

  for (const range of ranges) {
    for (let id = range[0]; id < range[1] + 1; id++) {
      console.debug('\nVerifying', id);
      const idString = id.toString();
      const halfLength = Math.ceil(idString.length / 2);
      const idLeftPart = idString.substring(0, halfLength);
      const idRightPart = idString.substring(halfLength, idString.length);
      console.debug('Left part', idLeftPart, 'Right part', idRightPart);

      if (idLeftPart === idRightPart) {
        invalidIds.push(id);
        console.debug('Invalid id!', id);
      }
    }
  }

  console.debug(invalidIds);
  const idSum = sum(invalidIds);

  return idSum;
}

export function part2(input: string): number {
  // Parse input
  const lines = input.trim().split('\n');
  const ranges = lines[0].split(',').map((rangeString) => {
    const split = rangeString.split('-');
    return [parseInt(split[0]), parseInt(split[1])];
  });

  console.debug(ranges);

  const invalidIds: number[] = [];

  for (const range of ranges) {
    idLoop: for (let id = range[0]; id < range[1] + 1; id++) {
      console.debug('\nVerifying', id);
      const idString = id.toString();

      if (idString.length <= 1) {
        continue idLoop;
      }

      const halfLength = Math.ceil(idString.length / 2);

      lengthLoop: for (let substringLength = 1; substringLength <= halfLength; substringLength++) {
        console.debug('Checking for repetition of length', substringLength);

        if (idString.length % substringLength !== 0) {
          console.debug(`Can not subdivide string into chunks of equal size ${substringLength}`);
          continue lengthLoop;
        }

        const re = new RegExp('.{1,' + substringLength + '}', 'g');
        const chunkedStrings = idString.match(re);
        console.debug(chunkedStrings);
        if (!chunkedStrings) {
          throw new Error('Did not get chunked string');
        }
        const stringToMatch = chunkedStrings[0];
        if (!chunkedStrings.every((chunkedString) => chunkedString === stringToMatch)) {
          console.debug('String not repeated, continuing!');
          continue lengthLoop;
        }

        console.debug('✅ Found invalid id!', id);
        invalidIds.push(id);
        continue idLoop;
      }
    }
  }

  console.info(invalidIds);
  const idSum = sum(invalidIds);

  return idSum;
}
