#!/usr/bin/env node

import { example } from './cli/example.js';
import { solve } from './cli/solve.js';
import { time } from './cli/time.js';

const args = process.argv.slice(2);
const command = args[0];

// Helper to check for --debug or --no-debug flags
function getDebugFlag(defaultValue: boolean): boolean {
  if (args.includes('--debug')) return true;
  if (args.includes('--no-debug')) return false;
  return defaultValue;
}

// Helper to filter out debug flags from args
function filterDebugFlags(args: string[]): string[] {
  return args.filter((arg) => arg !== '--debug' && arg !== '--no-debug');
}

async function main() {
  try {
    const cleanArgs = filterDebugFlags(args);
    const cleanCommand = cleanArgs[0];

    switch (cleanCommand) {
      case 'example': {
        const day = cleanArgs[1];
        const part = cleanArgs[2];
        const exampleNum = cleanArgs[3] || '1';
        const debug = getDebugFlag(true); // default enabled for example
        if (!day || !part) {
          console.error('Usage: aoc2025 example <day> <part> [exampleNum] [--debug|--no-debug]');
          process.exit(1);
        }
        await example(day, part, exampleNum, debug);
        break;
      }
      case 'solve': {
        const day = cleanArgs[1];
        const part = cleanArgs[2];
        const debug = getDebugFlag(false); // default disabled for solve
        if (!day || !part) {
          console.error('Usage: aoc2025 solve <day> <part> [--debug|--no-debug]');
          process.exit(1);
        }
        await solve(day, part, debug);
        break;
      }
      case 'time': {
        const day = cleanArgs[1];
        const part = cleanArgs[2];
        const debug = getDebugFlag(false); // default disabled for time
        if (!day || !part) {
          console.error('Usage: aoc2025 time <day> <part> [--debug|--no-debug]');
          process.exit(1);
        }
        await time(day, part, debug);
        break;
      }
      default:
        console.log(`Advent of Code 2025 Solution Runner

Usage:
  aoc2025 example <day> <part> [exampleNum] [--debug*|--no-debug] - Run solution against example input
  aoc2025 solve <day> <part> [--debug|--no-debug*]                - Run solution against real input
  aoc2025 time <day> <part> [--debug|--no-debug*]                 - Benchmark solution performance

  * implies default

Debug Flags:
  --debug      - Enable console.debug output
  --no-debug   - Disable console.debug output
  (default: enabled for example, disabled for solve and time)

Examples:
  aoc2025 example 1 1            - Run day 1 part 1 with first example (debug enabled)
  aoc2025 example 1 1 --no-debug - Run day 1 part 1 without debug output
  aoc2025 example 1 1 2          - Run day 1 part 1 with second example
  aoc2025 solve 1 1              - Run day 1 part 1 with real input (debug disabled)
  aoc2025 solve 1 1 --debug      - Run day 1 part 1 with debug output enabled
  aoc2025 time 1 1               - Benchmark day 1 part 1
`);
        process.exit(command ? 1 : 0);
    }
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
