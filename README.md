# Advent of Code 2025

Solutions for [Advent of Code 2025](https://adventofcode.com/2025) by Jurriaan Den Toonder.

No LLM or AI assistance was used to solve these problems,
the only LLM work was for setting up the project structure and tooling,
the actual solutions, including utilities in the lib folder are hand-crafted.

As per request of the Advent of Code organizers,
all solutions are allowed to be open source and publicly available,
but the inputs are not included in this repository.

## Setup

Install dependencies:

```bash
npm install
```

## Usage

Run commands using:

```bash
npm run aoc2025 <command> <day> <part> [options]
```

### Run against example input

```bash
npm run aoc2025 example <day> <part> [exampleNum]
```

Examples:

- `npm run aoc2025 example 1 1` - Run day 1 part 1 with first example
- `npm run aoc2025 example 1 1 2` - Run day 1 part 1 with second example

### Run against real input

```bash
npm run aoc2025 solve <day> <part>
```

Example:

- `npm run aoc2025 solve 1 1` - Run day 1 part 1 with real input

### Benchmark performance

```bash
npm run aoc2025 time <day> <part>
```

This will run the solution multiple times (10-10000 iterations based on execution time) and report performance statistics.

Example:

- `npm run aoc2025 time 1 1` - Benchmark day 1 part 1

## Project Structure

```
aoc2025/
├── src/
│   ├── index.ts              # CLI entry point
│   ├── cli/                  # CLI command handlers
│   │   ├── example.ts
│   │   ├── solve.ts
│   │   ├── time.ts
│   │   └── utils.ts
│   ├── days/                 # Daily solutions
│   │   └── day01/
│   │       └── index.ts
│   └── lib/                  # Shared utilities
│       ├── index.ts
│       ├── utils.ts          # General utility functions
│       └── grid.ts           # Grid/Point classes
├── data/
│   ├── examples/             # Example inputs
│   │   └── day01/
│   │       ├── part1.txt
│   │       ├── part1-2.txt   # Additional examples
│   │       └── part2.txt
│   └── inputs/               # Real puzzle inputs
│       └── day01/
│           ├── part1.txt
│           └── part2.txt
```

## Adding a New Day

1. Create a new directory for the day:

   ```bash
   mkdir -p src/days/day02
   ```

2. Create an `index.ts` file with `part1` and `part2` functions:

   ```typescript
   export function part1(input: string): number {
     const lines = input.trim().split('\n');
     // Your solution here
     return 0;
   }

   export function part2(input: string): number {
     const lines = input.trim().split('\n');
     // Your solution here
     return 0;
   }
   ```

3. Add input files:

   ```bash
   mkdir -p data/examples/day02 data/inputs/day02
   ```

   - `data/examples/day02/part1.txt` - Example for part 1
   - `data/examples/day02/part2.txt` - Example for part 2
   - `data/inputs/day02/part1.txt` - Real input for part 1
   - `data/inputs/day02/part2.txt` - Real input for part 2

   For additional examples, use: `part1-2.txt`, `part1-3.txt`, etc.

4. Run your solution:
   ```bash
   npm run aoc2025 example 2 1
   ```

## Shared Library

The `src/lib` directory contains reusable utilities, such as input parsing and common data structures needed for AoC problems.

Import utilities in your solutions:

```typescript
import { parseLines, sum } from '../../lib/index.js';
```

## License

MIT
