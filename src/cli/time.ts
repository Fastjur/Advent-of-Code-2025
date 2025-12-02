import { loadInput, loadSolution } from './utils.js';

export async function time(day: string, part: string, debug: boolean = false): Promise<void> {
  // Configure console.debug
  if (!debug) {
    console.debug = () => {};
  }

  console.log(`Benchmarking Day ${day} Part ${part}...\n`);

  const input = await loadInput(day, part, 'input');
  const solution = await loadSolution(day);

  const solver = part === '1' ? solution.part1 : solution.part2;

  // Warm-up run
  solver(input);

  // First timed run to determine iteration count
  const startFirst = performance.now();
  const result = solver(input);
  const endFirst = performance.now();
  const firstRunTime = endFirst - startFirst;

  console.log(`First run time: ${firstRunTime.toFixed(3)} ms`);

  // Calculate iterations: aim for ~10 second total, between 10 and 100000 runs
  let iterations: number;
  if (firstRunTime < 0.1) {
    iterations = 100000;
  } else if (firstRunTime < 1) {
    iterations = Math.floor(10000 / firstRunTime);
  } else if (firstRunTime < 100) {
    iterations = Math.floor(1000 / firstRunTime);
  } else {
    iterations = 10;
  }
  iterations = Math.max(10, Math.min(100000, iterations));

  console.log(`Running ${iterations} iterations...\n`);

  // Benchmark runs
  const times: number[] = [];
  for (let i = 0; i < iterations; i++) {
    if (iterations <= 100 || i % Math.ceil(iterations / 100) === 0) {
      console.log(`Iteration ${i + 1}/${iterations}`);
    }
    const start = performance.now();
    solver(input);
    const end = performance.now();
    times.push(end - start);
  }

  // Calculate statistics
  const sum = times.reduce((a, b) => a + b, 0);
  const avg = sum / times.length;
  const sorted = times.sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const median = sorted[Math.floor(sorted.length / 2)];

  console.log('Result:', result);
  console.log('\nPerformance Statistics:');
  console.log(`  Iterations: ${iterations}`);
  console.log(`  Average:    ${avg.toFixed(3)} ms`);
  console.log(`  Median:     ${median.toFixed(3)} ms`);
  console.log(`  Min:        ${min.toFixed(3)} ms`);
  console.log(`  Max:        ${max.toFixed(3)} ms`);
}
