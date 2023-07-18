import { BLACK_PAWNS_STARTING_POSITIONS, Game, WHITE_PAWNS_STARTING_POSITIONS } from './game';
import { Move } from './move';
import { Position } from './position';

export const COLORS = {
    NONE: -1,
    WHITE: 0,
    BLACK: 1
} as const;

export type COLORS_T = typeof COLORS[keyof typeof COLORS];

export interface FIGURES_I {
    name: string;
    symbol: string;
    get_moves: (game: Game, position: Position) => Move[];
}

export interface DEFAULT_FIGURES_I {
    [key: number] : FIGURES_I;
} 

export const FIGURES: DEFAULT_FIGURES_I = {
    0: {
        name: 'pawn',
        symbol: '♙', 
        get_moves: pawn_move_function
    },
    1: {
        name: 'rook',
        symbol: '♖',
        get_moves: rook_move_function
    },
    2: {
        name: 'knight',
        symbol: '♘',
        get_moves: knight_move_function
    },
    3: {
        name: 'bishop',
        symbol: '♗',
        get_moves: bishop_move_function
    },
    4: {
        name: 'queen',
        symbol: '♕',
        get_moves: queen_move_function
    },
    5: {
        name: 'king',
        symbol: '♔',
        get_moves: king_move_function
    }
} as const;

export function get_default_figure_by_name(name: string): number {
    for (let [key, figure] of Object.entries(FIGURES)) {
        if (figure.name == name) {
            return parseInt(key);
        }
    }
    throw new Error('Figure not found');
}

export type FIGURES_T = keyof typeof FIGURES;

export class Figure {
    position: Position;
    color: COLORS_T;
    figure: FIGURES_T;
    is_alive: boolean;

    constructor(position: Position, color: COLORS_T, figure: FIGURES_T, is_alive: boolean = false) {
        this.position = position;
        this.color = color;
        this.figure = figure;
        this.is_alive = is_alive;
    }

    init(position: Position, color: COLORS_T, figure: FIGURES_T): void {
        this.position = position;
        this.color = color;
        this.figure = figure;
        this.is_alive = true;
    }

    set_position(position: Position): void {
        position.clone(this.position);
    }

    clone(figure: Figure): void {
        figure.color = this.color;
        figure.figure = this.figure;
        figure.is_alive = this.is_alive;
        this.position.clone(figure.position);
    }

    get_moves(game: Game): Move[] {
        let moves = FIGURES[this.figure].get_moves(game, this.position); 
        return moves;
    }
}

function pawn_move_function(game: Game, position: Position): Move[] {
    let figure = game.get_figure(position);
    if (figure == null) {
        throw new Error('Figure not found');
    }
    let moves: Move[] = [];
    if (figure.color == COLORS.WHITE) {
        let temp_position = new Position(position.x, position.y + 1, position.z - 1);
        let temp_figure = game.get_figure(temp_position);
        if (temp_figure !== undefined && temp_figure.color != figure.color) {
            moves.push(new Move(position, temp_position, figure.figure, figure.figure, temp_figure.figure, temp_figure.color));
        }
        temp_position = new Position(position.x - 1, position.y, position.z + 1);
        temp_figure = game.get_figure(temp_position);
        if (temp_figure !== undefined && temp_figure.color != figure.color) {
            moves.push(new Move(position, temp_position, figure.figure, figure.figure, temp_figure.figure, temp_figure.color));
        }
        temp_position = new Position(position.x - 1, position.y + 1, position.z);
        if (!game.is_valid_position(temp_position)) {
            return moves;
        }
        temp_figure = game.get_figure(temp_position);
        if (temp_figure !== undefined) {
            return moves;
        }
        moves.push(new Move(position, temp_position, figure.figure, figure.figure));
        if (WHITE_PAWNS_STARTING_POSITIONS.some(spawn_position => spawn_position.equals(position))) {
            temp_position = new Position(position.x - 2, position.y + 2, position.z);
            if (!game.is_valid_position(temp_position)) {
                return moves;
            }
            temp_figure = game.get_figure(temp_position);
            if (temp_figure !== undefined) {
                return moves;
            }
            moves.push(new Move(position, temp_position, figure.figure, figure.figure));
        }
    } else {
        let temp_position = new Position(position.x + 1, position.y, position.z - 1);
        let temp_figure = game.get_figure(temp_position);
        if (temp_figure !== undefined && temp_figure.color != figure.color) {
            moves.push(new Move(position, temp_position, figure.figure, figure.figure, temp_figure.figure, temp_figure.color));
        }
        temp_position = new Position(position.x, position.y - 1, position.z + 1);
        temp_figure = game.get_figure(temp_position);
        if (temp_figure !== undefined && temp_figure.color != figure.color) {
            moves.push(new Move(position, temp_position, figure.figure, figure.figure, temp_figure.figure, temp_figure.color));
        }
        temp_position = new Position(position.x + 1, position.y - 1, position.z);
        if (!game.is_valid_position(temp_position)) {
            return moves;
        }
        temp_figure = game.get_figure(temp_position);
        if (temp_figure !== undefined) {
            return moves;
        }
        moves.push(new Move(position, temp_position, figure.figure, figure.figure));
        if (BLACK_PAWNS_STARTING_POSITIONS.some(spawn_position => spawn_position.equals(position))) {
            temp_position = new Position(position.x + 2, position.y - 2, position.z);
            if (!game.is_valid_position(temp_position)) {
                return moves;
            }
            temp_figure = game.get_figure(temp_position);
            if (temp_figure !== undefined) {
                return moves;
            }
            moves.push(new Move(position, temp_position, figure.figure, figure.figure));
        }
    }
    return moves;
}

function rook_move_function(game: Game, position: Position): Move[] {
    return [];
}

function knight_move_function(game: Game, position: Position): Move[] {
    return [];
}

function bishop_move_function(game: Game, position: Position): Move[] {
    return [];
}

function queen_move_function(game: Game, position: Position): Move[] {
    return [];
}

function king_move_function(game: Game, position: Position): Move[]  {
    return [];
}
