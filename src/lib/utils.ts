/**
 * Sum an array of numbers
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

