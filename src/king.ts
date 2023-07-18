import { Figure, hit_or_go_move_function } from "./figure";
import { Game } from "./game";
import { Move } from "./move";
import { Position } from "./position";

const king_directions: Position[] = [
    new Position(-1, -1),
    new Position(1, -2),
    new Position(2, -1),
    new Position(1, 1),
    new Position(-1, 2),
    new Position(-2, 1),
    new Position(1, 0),
    new Position(0, 1),
    new Position(-1, 0),
    new Position(0, -1),
    new Position(1, -1),
    new Position(-1, 1)
];

export function king_move_function(game: Game, figure: Figure): Move[] {
    let moves: Move[] = [];
    for (let direction of king_directions) {
        moves = moves.concat(hit_or_go_move_function(game, figure, direction));
    }
    return moves;
}