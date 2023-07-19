import { COLORS, COLORS_T, Figure, get_default_figure_by_name } from "./figure";
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

function can_promote(game: Game, position: Position, color: COLORS_T): boolean {
    let isWhite = color == COLORS.WHITE;
    return  (isWhite && position.z > 0 && position.x == -game.size) ||
            (isWhite && position.get_y() == game.size) ||
            (!isWhite && position.z < 0 && position.x == game.size) ||
            (!isWhite && position.get_y() == -game.size);
}

function get_en_passant_moves(game: Game, figure: Figure): Move[] {
    let last_move = game.get_last_move();
    if (last_move == undefined) {
        return [];
    }
    let last_new_position = last_move.new_position;
    if (
        !last_move ||
        last_move.old_figure_id != get_default_figure_by_name("pawn") ||
        last_move.old_position.z != last_move.new_position.z ||
        Math.abs(last_move.old_position.x - last_move.new_position.x) != 2
    ) {
        return [];
    }

    if (figure.color == COLORS.WHITE) {
        if (last_new_position.z == figure.position.z - 1 && last_new_position.x == figure.position.x + 1) {
            return [new Move(figure.position, new Position(figure.position.x, figure.position.z - 1), figure.figure, get_default_figure_by_name("pawn"), last_move.new_figure_id, COLORS.BLACK)]
        } else if (last_new_position.z == figure.position.z + 1 && last_new_position.x == figure.position.x) {
            return [new Move(figure.position, new Position(figure.position.x - 1, figure.position.z + 1), figure.figure, get_default_figure_by_name("pawn"), last_move.new_figure_id, COLORS.BLACK)]
        }
    } else {
        if (last_new_position.z == figure.position.z + 1 && last_new_position.x == figure.position.x - 1) {
            return [new Move(figure.position, new Position(figure.position.x, figure.position.z + 1), figure.figure, get_default_figure_by_name("pawn"), last_move.new_figure_id, COLORS.WHITE)]
        } else if (last_new_position.z == figure.position.z - 1 && last_new_position.x == figure.position.x) {
            return [new Move(figure.position, new Position(figure.position.x + 1, figure.position.z - 1), figure.figure, get_default_figure_by_name("pawn"), last_move.new_figure_id, COLORS.WHITE)]
        }
    }
    return [];
}

export function pawn_move_function(game: Game, figure: Figure): Move[] {
    let position = figure.position;
    if (figure == null) {
        throw new Error('Figure not found');
    }
    let moves: Move[] = [];
    let multiplier = figure.color == COLORS.WHITE ? 1 : -1;
    let isWhite = figure.color == COLORS.WHITE;
    let temp_position: Position; 
    let temp_figure: Figure;
    
    //Above hit scan
    temp_position = new Position(position.x, position.z - multiplier);
    if (can_hit(game, temp_position, figure.color)) {
        temp_figure = game.get_figure(temp_position);
        if (can_promote(game, temp_position, figure.color)) {
            moves.push(new Move(position, temp_position, figure.figure, get_default_figure_by_name("knight"), temp_figure.figure, temp_figure.color));
            moves.push(new Move(position, temp_position, figure.figure, get_default_figure_by_name("bishop"), temp_figure.figure, temp_figure.color));
            moves.push(new Move(position, temp_position, figure.figure, get_default_figure_by_name("rook"), temp_figure.figure, temp_figure.color));
            moves.push(new Move(position, temp_position, figure.figure, get_default_figure_by_name("queen"), temp_figure.figure, temp_figure.color));
        } else {
            moves.push(new Move(position, temp_position, figure.figure, figure.figure, temp_figure.figure, temp_figure.color));
        }
    }

    //Below hit scan
    temp_position = new Position(position.x - multiplier, position.z + multiplier);
    if (can_hit(game, temp_position, figure.color)) {
        temp_figure = game.get_figure(temp_position);
        if (can_promote(game, temp_position, figure.color)) {
            moves.push(new Move(position, temp_position, figure.figure, get_default_figure_by_name("knight"), temp_figure.figure, temp_figure.color));
            moves.push(new Move(position, temp_position, figure.figure, get_default_figure_by_name("bishop"), temp_figure.figure, temp_figure.color));
            moves.push(new Move(position, temp_position, figure.figure, get_default_figure_by_name("rook"), temp_figure.figure, temp_figure.color));
            moves.push(new Move(position, temp_position, figure.figure, get_default_figure_by_name("queen"), temp_figure.figure, temp_figure.color));
        } else {
            moves.push(new Move(position, temp_position, figure.figure, figure.figure, temp_figure.figure, temp_figure.color));
        }
    }

    //En passant
    moves = moves.concat(get_en_passant_moves(game, figure));

    //Forward move scan
    temp_position = new Position(position.x - multiplier, position.z);
    if (!can_move(game, temp_position)) {
        return moves;
    }
    
    //Promotion
    if (can_promote(game, temp_position, figure.color)) {
        moves.push(new Move(position, temp_position, figure.figure, get_default_figure_by_name("knight")));
        moves.push(new Move(position, temp_position, figure.figure, get_default_figure_by_name("bishop")));
        moves.push(new Move(position, temp_position, figure.figure, get_default_figure_by_name("rook")));
        moves.push(new Move(position, temp_position, figure.figure, get_default_figure_by_name("queen")));
    } else {
        moves.push(new Move(position, temp_position, figure.figure, figure.figure));
    }

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

    return moves;
}