import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..', '..');

export async function loadInput(
  day: string,
  part: string,
  type: 'example' | 'input',
  exampleNum: string = '1'
): Promise<string> {
  const paddedDay = day.padStart(2, '0');

  let filename: string;
  if (type === 'example') {
    filename = exampleNum === '1' ? `part${part}.txt` : `part${part}-${exampleNum}.txt`;
  } else {
    filename = `part${part}.txt`;
  }

  const folder = type === 'example' ? 'examples' : 'inputs';
  const filePath = join(rootDir, 'data', folder, `day${paddedDay}`, filename);

  try {
    const content = await readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(error);
    throw new Error(`Could not read ${type} file: ${filePath}`);
  }
}

export async function loadSolution(day: string): Promise<{
  part1: (input: string) => unknown;
  part2: (input: string) => unknown;
}> {
  const paddedDay = day.padStart(2, '0');
  const modulePath = `../days/day${paddedDay}/index.js`;

  try {
    const module = await import(modulePath);
    if (!module.part1 || !module.part2) {
      throw new Error(`Day ${day} must export both part1 and part2 functions`);
    }
    return { part1: module.part1, part2: module.part2 };
  } catch (error) {
    if (error instanceof Error && error.message.includes('Cannot find module')) {
      throw new Error(`Solution for day ${day} not found. Expected file: src/days/day${paddedDay}/index.ts`);
    }
    throw error;
  }
}
