import { bishop_move_function } from './bishop';
import { Game } from './game';
import { king_move_function } from './king';
import { knight_move_function } from './knight';
import { Move } from './move';
import { pawn_move_function } from './pawn';
import { Position } from './position';
import { queen_move_function } from './queen';
import { rook_move_function } from './rook';

export const COLORS = {
    NONE: -1,
    WHITE: 0,
    BLACK: 1
} as const;

export type COLORS_T = typeof COLORS[keyof typeof COLORS];

export interface FIGURES_I {
    name: string;
    symbol: string;
    get_moves: (game: Game, figure: Figure) => Move[];
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

export function line_move_function(game: Game, figure: Figure, direction: Position): Move[] {
    let moves: Move[] = [];
    let position = new Position();
    figure.position.clone_into(position);
    position.add(direction);
    while (game.is_valid_position(position)) {
        let hit_figure = game.get_figure(position);
        if (hit_figure) {
            if (hit_figure.color != figure.color) {
                moves.push(new Move(figure.position, position, figure.figure, figure.figure, hit_figure.figure, hit_figure.color));
            }
            break;
        }
        moves.push(new Move(figure.position, position, figure.figure, figure.figure));
        position.add(direction);
    }
    return moves;    
}

export function hit_or_go_move_function(game: Game, figure: Figure, direction: Position): Move[] {
    let moves: Move[] = [];
    let position = new Position();
    figure.position.clone_into(position);
    position.add(direction);
    if (game.is_valid_position(position)) {
        let hit_figure = game.get_figure(position);
        if (hit_figure) {
            if (hit_figure.color != figure.color) {
                moves.push(new Move(figure.position, position, figure.figure, figure.figure, hit_figure.figure, hit_figure.color));
            }
        } else {
            moves.push(new Move(figure.position, position, figure.figure, figure.figure));
        }
    }
    return moves;
}

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
        position.clone_into(this.position);
    }

    clone(figure: Figure): void {
        figure.color = this.color;
        figure.figure = this.figure;
        figure.is_alive = this.is_alive;
        this.position.clone_into(figure.position);
    }

    get_moves(game: Game): Move[] {
        let moves = FIGURES[this.figure].get_moves(game, this); 
        let temp_game = game.temp_game;
        game.clone_into(temp_game);
        moves = moves.filter(move => {
            temp_game.execute_move(move);
            let has_check = temp_game.has_check(this.color);
            temp_game.undo_move();
            return !has_check;
        })
        return moves;
    }
}