import { Figure, hit_or_go_move_function } from "./figure";
import { Game } from "./game";
import { Move } from "./move";
import { Position } from "./position";

const knight_directions: Position[] = [
    new Position(-1, -2),
    new Position(1, -3),
    new Position(2, -3),
    new Position(3, -2),
    new Position(3, -1),
    new Position(2, 1),
    new Position(1, 2),
    new Position(-1, 3),
    new Position(-2, 3),
    new Position(-3, 2),
    new Position(-3, 1),
    new Position(-2, -1)
];

export function knight_move_function(game: Game, figure: Figure): Move[] {
    let moves: Move[] = [];
    for (let direction of knight_directions) {
        moves = moves.concat(hit_or_go_move_function(game, figure, direction));
    }
    return moves;
}