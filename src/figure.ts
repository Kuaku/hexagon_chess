import { BLACK_PAWNS_STARTING_POSITIONS, Game, WHITE_PAWNS_STARTING_POSITIONS } from './game';
import { Move } from './move';
import { pawn_move_function } from './pawn';
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
        //TODO: Filter moves that would result in check
        return moves;
    }
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
