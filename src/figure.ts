import { Game } from './game';
import { Position } from './position';

export const COLORS = {
    WHITE: 0,
    BLACK: 1
} as const;

export type COLORS_T = typeof COLORS[keyof typeof COLORS];

export interface FIGURES_I {
    name: string;
    symbol: string;
    can_move: (enviroment: any, figure: Figure, new_position: Position) => boolean;
}

export interface DEFAULT_FIGURES_I {
    [key: number] : FIGURES_I;
} 

export const FIGURES: DEFAULT_FIGURES_I = {
    0: {
        name: 'pawn',
        symbol: '♙', 
        can_move: pawn_move_function
    },
    1: {
        name: 'rook',
        symbol: '♖',
        can_move: rook_move_function
    },
    2: {
        name: 'knight',
        symbol: '♘',
        can_move: knight_move_function
    },
    3: {
        name: 'bishop',
        symbol: '♗',
        can_move: bishop_move_function
    },
    4: {
        name: 'queen',
        symbol: '♕',
        can_move: queen_move_function
    },
    5: {
        name: 'king',
        symbol: '♔',
        can_move: king_move_function
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

    clone(): Figure {
        return new Figure(this.position.clone(), this.color, this.figure);
    }
}

function pawn_move_function(enviroment: Game, figure: Figure, new_position: Position): boolean {
    return true;
}

function rook_move_function(enviroment: Game, figure: Figure, new_position: Position): boolean {
    return true;
}

function knight_move_function(enviroment: Game, figure: Figure, new_position: Position): boolean {
    return true;
}

function bishop_move_function(enviroment: Game, figure: Figure, new_position: Position): boolean {
    return true;
}

function queen_move_function(enviroment: Game, figure: Figure, new_position: Position): boolean {
    return true;
}

function king_move_function(enviroment: Game, figure: Figure, new_position: Position): boolean {
    return true;
}
