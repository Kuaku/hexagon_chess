import { Figure, line_move_function } from "./figure";
import { Game } from "./game";
import { Move } from "./move";
import { Position } from "./position";



const rook_directions: Position[] = [
    new Position(1, 0),
    new Position(0, 1),
    new Position(-1, 0),
    new Position(0, -1),
    new Position(1, -1),
    new Position(-1, 1)
];

export function rook_move_function(game: Game, figure: Figure): Move[] {
    let moves: Move[] = [];
    for (let direction of rook_directions) {
        moves = moves.concat(line_move_function(game, figure, direction));
    }
    return moves;
}
