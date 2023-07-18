import { COLORS, COLORS_T, Figure } from "./figure";
import { BLACK_PAWNS_STARTING_POSITIONS, Game, WHITE_PAWNS_STARTING_POSITIONS } from "./game";
import { Move } from "./move";
import { Position } from "./position";

function can_hit(game: Game, position: Position, color: COLORS_T): boolean {
    let temp_figure = game.get_figure(position);
    return temp_figure !== undefined && temp_figure.color != color;
}

function can_move(game: Game, position: Position): boolean {
    if (!game.is_valid_position(position)) {
        return false;
    }
    let temp_figure = game.get_figure(position);
    return temp_figure === undefined;
}

export function pawn_move_function(game: Game, figure: Figure): Move[] {
    let position = figure.position;
    if (figure == null) {
        throw new Error('Figure not found');
    }
    let moves: Move[] = [];
    let multiplier = figure.color == COLORS.WHITE ? 1 : -1;
    let temp_position: Position; 
    let temp_figure: Figure;
    
    //Above hit scan
    temp_position = new Position(position.x, position.z - multiplier);
    if (can_hit(game, temp_position, figure.color)) {
        moves.push(new Move(position, temp_position, figure.figure, figure.figure, temp_figure.figure, temp_figure.color));
    }

    //Below hit scan
    temp_position = new Position(position.x - multiplier, position.z + multiplier);
    if (can_hit(game, temp_position, figure.color)) {
        moves.push(new Move(position, temp_position, figure.figure, figure.figure, temp_figure.figure, temp_figure.color));
    }

    //Forward move scan
    temp_position = new Position(position.x - multiplier, position.z);
    if (!can_move(game, temp_position)) {
        return moves;
    }
    moves.push(new Move(position, temp_position, figure.figure, figure.figure));
    
    //Forward double move scan
    let starting_positions = figure.color == COLORS.WHITE ? WHITE_PAWNS_STARTING_POSITIONS : BLACK_PAWNS_STARTING_POSITIONS;
    if (!starting_positions.some(spawn_position => spawn_position.equals(position))) {
        return moves;
    }
    temp_position = new Position(position.x - 2 * multiplier, position.z);
    if (!can_move(game, temp_position)) {
        return moves;
    }
    moves.push(new Move(position, temp_position, figure.figure, figure.figure));
    
    //TODO: En passant
    //TODO: Promotion
    return moves;
}