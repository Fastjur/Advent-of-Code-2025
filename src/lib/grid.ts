/**
 * Grid class for 2D grid operations
 */
export class Grid<T> {
  get height(): number {
    return this.cells.length;
  }

  get width(): number {
    return this.cells[0]?.length || 0;
  }

  constructor(public cells: T[][]) {}

  static fromString(input: string): Grid<string> {
    const cells = input
      .trim()
      .split('\n')
      .map((line) => line.split(''));
    return new Grid(cells);
  }

  clone(): Grid<T> {
    return new Grid(this.cells.map((row) => [...row]));
  }

  find(predicate: (value: T) => boolean): Point | undefined {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (predicate(this.cells[y][x])) {
          return new Point(x, y);
        }
      }
    }
    return undefined;
  }

  findAll(predicate: (value: T) => boolean): Point[] {
    const points: Point[] = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (predicate(this.cells[y][x])) {
          points.push(new Point(x, y));
        }
      }
    }
    return points;
  }

  get(point: Point): T | undefined {
    if (!this.inBounds(point)) return undefined;
    return this.cells[point.y][point.x];
  }

  inBounds(point: Point): boolean {
    return point.x >= 0 && point.x < this.width && point.y >= 0 && point.y < this.height;
  }

  neighbors(point: Point, includeDiagonals: boolean = false): Point[] {
    const directions = includeDiagonals ? Point.DIRECTIONS_8 : Point.DIRECTIONS;
    return directions.map((dir) => point.add(dir)).filter((p) => this.inBounds(p));
  }

  neighborsWithFilter(point: Point, predicate: (value: T) => boolean, includeDiagonals: boolean = false) {
    const directions = includeDiagonals ? Point.DIRECTIONS_8 : Point.DIRECTIONS;
    return directions
      .map((dir) => point.add(dir))
      .filter((p) => {
        if (!this.inBounds(p)) {
          return false;
        }
        const value = this.get(p);
        if (value === undefined) {
          return false;
        }
        return predicate(value);
      });
  }

  set(point: Point, value: T): void {
    if (!this.inBounds(point)) return;
    this.cells[point.y][point.x] = value;
  }

  toString(): string {
    return this.cells.map((row) => row.join('')).join('\n');
  }
}

/**
 * 2D Point class for grid-based problems
 */
export class Point {
  static readonly EAST = new Point(1, 0);
  static readonly NORTH = new Point(0, -1);
  static readonly SOUTH = new Point(0, 1);
  static readonly WEST = new Point(-1, 0);

  static readonly DIRECTIONS = [Point.NORTH, Point.EAST, Point.SOUTH, Point.WEST];

  static readonly NORTH_EAST = new Point(1, -1);
  static readonly NORTH_WEST = new Point(-1, -1);
  static readonly SOUTH_EAST = new Point(1, 1);
  static readonly SOUTH_WEST = new Point(-1, 1);

  static readonly DIRECTIONS_8 = [
    Point.NORTH,
    Point.NORTH_EAST,
    Point.EAST,
    Point.SOUTH_EAST,
    Point.SOUTH,
    Point.SOUTH_WEST,
    Point.WEST,
    Point.NORTH_WEST,
  ];

  constructor(
    public x: number,
    public y: number
  ) {}

  add(other: Point): Point {
    return new Point(this.x + other.x, this.y + other.y);
  }

  equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }

  manhattanDistance(other: Point): number {
    return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
  }

  subtract(other: Point): Point {
    return new Point(this.x - other.x, this.y - other.y);
  }

  toString(): string {
    return `(${this.x},${this.y})`;
  }
}
