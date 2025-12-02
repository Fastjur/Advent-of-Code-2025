import { loadInput, loadSolution } from './utils.js';

export async function solve(day: string, part: string, debug: boolean = false): Promise<void> {
  // Configure console.debug
  if (!debug) {
    console.debug = () => {};
  }

  console.log(`Solving Day ${day} Part ${part}...\n`);

  const input = await loadInput(day, part, 'input');
  const solution = await loadSolution(day);

  const solver = part === '1' ? solution.part1 : solution.part2;
  const result = solver(input);

  console.log('Result:', result);
}
