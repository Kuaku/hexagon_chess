export class Position {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    equals(position: Position): boolean {
        return this.x == position.x && this.y == position.y && this.z == position.z;
    }

    clone(): Position {
        return new Position(this.x, this.y, this.z);
    }

    to_string(): string {
        return `Position(${this.x}, ${this.y}, ${this.z})`;
    }
}