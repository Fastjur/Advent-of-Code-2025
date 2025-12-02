import { loadInput, loadSolution } from './utils.js';

export async function example(
  day: string,
  part: string,
  exampleNum: string = '1',
  debug: boolean = true
): Promise<void> {
  // Configure console.debug
  if (!debug) {
    console.debug = () => {};
  }

  console.log(`Running Day ${day} Part ${part} with example ${exampleNum}...\n`);

  const input = await loadInput(day, part, 'example', exampleNum);
  const solution = await loadSolution(day);

  const solver = part === '1' ? solution.part1 : solution.part2;
  const result = solver(input);

  console.log('Result:', result);
}
