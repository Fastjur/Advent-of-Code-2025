/**
 * Advent of Code 2025 - Day 3
 */

import { max, parseLines, parseNumbers, sum } from '../../lib/index.js';

export function part1(input: string): number {
  const lines = parseLines(input);
  const batteryBanks = lines.map((line) => parseNumbers(line, ''));

  const joltages = batteryBanks.map((bank) => {
    console.debug('\n\nChecking battery bank', bank);
    return getLargestJoltageOfBatteryBank(bank, 2);
  });
  const summed = sum(joltages);
  console.debug('Joltages', joltages);

  return summed;
}

export function part2(input: string): number {
  const lines = parseLines(input);
  const batteryBanks = lines.map((line) => parseNumbers(line, ''));

  const joltages = batteryBanks.map((bank) => {
    console.debug('\n\nChecking battery bank', bank);
    return getLargestJoltageOfBatteryBank(bank, 12);
  });
  const summed = sum(joltages);
  console.debug('Joltages', joltages);

  return summed;
}

function getLargestJoltageOfBatteryBank(batteryBank: number[], remainingNumbers: number): number {
  if (remainingNumbers <= 0) {
    return 0;
  }
  console.debug(`Bank (${remainingNumbers} remaining)`, batteryBank);
  const validBank = batteryBank.slice(0, remainingNumbers > 1 ? -(remainingNumbers - 1) : undefined);
  console.debug('Valid bank to look for highest number', validBank);
  const highestNumber = max(validBank);
  const highestNumberIdx = batteryBank.findIndex((value) => value === highestNumber);
  console.debug('Highest number', highestNumber, 'index', highestNumberIdx);

  const remainingBank = batteryBank.slice(highestNumberIdx + 1);
  console.debug('Remaining bank', remainingBank);
  return (
    highestNumber * 10 ** (remainingNumbers - 1) + getLargestJoltageOfBatteryBank(remainingBank, remainingNumbers - 1)
  );
}
