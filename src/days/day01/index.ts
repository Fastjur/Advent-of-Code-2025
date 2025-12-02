/**
 * Advent of Code 2025 - Day 1
 */

export function part1(input: string): number {
  // Parse input
  const lines = input.trim().split('\n');

  console.log(lines);

  let number = 50;
  let timesAtZero = 0;

  for (const rotation of lines) {
    const direction = rotation[0];
    let clicks = parseInt(rotation.substring(1));

    if (clicks >= 100) {
      clicks = clicks % 100;
    }

    if (direction === 'L') {
      number -= clicks;
    } else if (direction === 'R') {
      number += clicks;
    } else {
      throw new Error(`Error reading ${rotation}`);
    }

    if (number < 0) {
      number = 100 + number;
    }

    if (number > 99) {
      number = number - 100;
    }

    if (number === 0) {
      timesAtZero++;
    }

    console.debug(`Postition: ${number}`);
  }

  return timesAtZero;
}

export function part2(input: string): number {
  // Parse input
  const lines = input.trim().split('\n');

  let position = 50;
  let totalTimesPastZero = 0;

  for (const rotation of lines) {
    const startingPosition = position;
    console.debug(`Starting position:\t${startingPosition}`);
    console.debug(`Rotation:\t\t${rotation}`);
    const direction = rotation[0];
    let clicks = parseInt(rotation.substring(1));
    const fullRotations = Math.floor(clicks / 100);
    console.debug(`Full rotations:\t\t${fullRotations}`);

    if (clicks >= 100) {
      clicks = clicks % 100;
    }

    if (direction === 'L') {
      clicks = clicks * -1;
    } else if (direction === 'R') {
      clicks = clicks * 1;
    } else {
      throw new Error(`Error reading ${rotation}`);
    }

    position += clicks;

    if (position < 0) {
      position = 100 + position;
    }

    if (position > 99) {
      position = position - 100;
    }

    console.debug(`New Postition:\t\t${position}`);
    console.debug(`Old times past zero:\t${totalTimesPastZero}`);

    if (direction === 'L') {
      if (startingPosition !== 0 && startingPosition + clicks < 0) {
        totalTimesPastZero++;
      }
    }
    if (direction === 'R') {
      if (startingPosition + clicks > 99 && position !== 0) {
        totalTimesPastZero++;
      }
    }
    totalTimesPastZero += fullRotations;

    if (position === 0) {
      totalTimesPastZero++;
    }

    console.debug(`New times past zero:\t${totalTimesPastZero}\n`);
  }

  return totalTimesPastZero;
}
