import { Figure, line_move_function } from "./figure";
import { Game } from "./game";
import { Move } from "./move";
import { Position } from "./position";

const bishop_directions: Position[] = [
    new Position(-1, -1),
    new Position(1, -2),
    new Position(2, -1),
    new Position(1, 1),
    new Position(-1, 2),
    new Position(-2, 1)
];

export function bishop_move_function(game: Game, figure: Figure): Move[] {
    let moves: Move[] = [];
    for (let direction of bishop_directions) {
        moves = moves.concat(line_move_function(game, figure, direction));
    }
    return moves;
}