export class Position {
    x: number;
    y: number;
    z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    set(x: number, y: number, z: number): void {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    equals(position: Position): boolean {
        return this.x == position.x && this.y == position.y && this.z == position.z;
    }

    clone(position: Position): void {
        position.set(this.x, this.y, this.z);
    }

    to_string(): string {
        return `Position(${this.x}, ${this.y}, ${this.z})`;
    }
}