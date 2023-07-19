export class Position {
    x: number;
    z: number;

    constructor(x: number = 0, z: number = 0) {
        this.x = x;
        this.z = z;
    }

    get_y(): number {
        return - this.x - this.z;
    }

    set(x: number, z: number): void {
        this.x = x;
        this.z = z;
    }

    add(position: Position): void {
        this.x += position.x;
        this.z += position.z;
    }

    equals(position: Position): boolean {
        return this.x == position.x && this.z == position.z;
    }

    clone_into(position: Position): void {
        position.set(this.x, this.z);
    }

    to_string(): string {
        return `Position(${this.x}, ${this.z})`;
    }
}