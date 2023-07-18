import { COLORS, COLORS_T } from "./figure";
import { Position } from "./position";

export class Move {
    old_position: Position;
    new_position: Position;
    old_figure_id: number;
    new_figure_id: number;
    hit_figure_id: number;
    hit_figure_color: COLORS_T
    constructor(old_position: Position, new_position: Position, old_figure_id: number, new_figure_id: number, hit_figure_id: number = -1, hit_figure_color: COLORS_T = COLORS.NONE) {
        this.old_position = new Position();
        old_position.clone_into(this.old_position);
        this.new_position = new Position();
        new_position.clone_into(this.new_position);

        this.old_figure_id = old_figure_id;
        this.new_figure_id = new_figure_id;
        this.hit_figure_id = hit_figure_id;
        this.hit_figure_color = hit_figure_color;
    }

    equals(move: Move): boolean {
        return this.old_position.equals(move.old_position) 
        && this.new_position.equals(move.new_position)
        && this.old_figure_id == move.old_figure_id
        && this.new_figure_id == move.new_figure_id
        && this.hit_figure_id == move.hit_figure_id
        && this.hit_figure_color == move.hit_figure_color;
    }
}