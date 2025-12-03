/**
 * Find the maximum value in an array
 */
export function max(numbers: number[]): number {
  return Math.max(...numbers);
}

/**
 * Parse a string into an array of lines
 */
export function parseLines(input: string): string[] {
  return input.trim().split('\n');
}

/**
 * Parse a string into an array of numbers
 */
export function parseNumbers(input: string, separator: RegExp | string = /\s+/): number[] {
  return input.trim().split(separator).map(Number);
}

/**
 * Sum an array of numbers
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}
