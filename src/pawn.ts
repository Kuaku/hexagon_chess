import { COLORS, Figure } from "./figure";
import { BLACK_PAWNS_STARTING_POSITIONS, Game, WHITE_PAWNS_STARTING_POSITIONS } from "./game";
import { Move } from "./move";
import { Position } from "./position";

export function pawn_move_function(game: Game, position: Position): Move[] {
    let figure = game.get_figure(position);
    if (figure == null) {
        throw new Error('Figure not found');
    }
    let moves: Move[] = [];
    let multiplier = figure.color == COLORS.WHITE ? 1 : -1;
    let temp_position: Position; 
    let temp_figure: Figure;
    
    //Above hit scan
    temp_position = new Position(position.x, position.z - multiplier);
    temp_figure = game.get_figure(temp_position);
    if (temp_figure !== undefined && temp_figure.color != figure.color) {
        moves.push(new Move(position, temp_position, figure.figure, figure.figure, temp_figure.figure, temp_figure.color));
    }

    //Below hit scan
    temp_position = new Position(position.x - multiplier, position.z + multiplier);
    temp_figure = game.get_figure(temp_position);
    if (temp_figure !== undefined && temp_figure.color != figure.color) {
        moves.push(new Move(position, temp_position, figure.figure, figure.figure, temp_figure.figure, temp_figure.color));
    }

    //Forward move scan
    temp_position = new Position(position.x - multiplier, position.z);
    if (!game.is_valid_position(temp_position)) {
        return moves;
    }
    temp_figure = game.get_figure(temp_position);
    if (temp_figure !== undefined) {
        return moves;
    }
    moves.push(new Move(position, temp_position, figure.figure, figure.figure));
    
    //Forward double move scan
    let starting_positions = figure.color == COLORS.WHITE ? WHITE_PAWNS_STARTING_POSITIONS : BLACK_PAWNS_STARTING_POSITIONS;
    if (!starting_positions.some(spawn_position => spawn_position.equals(position))) {
        return moves;
    }
    temp_position = new Position(position.x - 2 * multiplier, position.z);
    if (!game.is_valid_position(temp_position)) {
        return moves;
    }
    temp_figure = game.get_figure(temp_position);
    if (temp_figure !== undefined) {
        return moves;
    }
    moves.push(new Move(position, temp_position, figure.figure, figure.figure));
    
    //TODO: En passant
    //TODO: Promotion
    return moves;
}