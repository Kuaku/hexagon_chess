import { COLORS, FIGURES, Figure, get_default_figure_by_name, COLORS_T } from './figure';
import { Move } from './move';
import { Position } from "./position";

export const BLACK_PAWNS_STARTING_POSITIONS: Position[] = [
    new Position(-5, 4),
    new Position(-4, 3),
    new Position(-3, 2),
    new Position(-2, 1),
    new Position(-1, 0),
    new Position(-1, -1),
    new Position(-1, -2),
    new Position(-1, -3),
    new Position(-1, -4)
];

export const WHITE_PAWNS_STARTING_POSITIONS: Position[] = [
    new Position(5, -4),
    new Position(4, -3),
    new Position(3, -2),
    new Position(2, -1),
    new Position(1, 0),
    new Position(1, 1),
    new Position(1, 2),
    new Position(1, 3),
    new Position(1, 4)
];

export class Game {
    figures: Figure[] = [];
    size: number = 5;
    history: Move[] = [];

    temp_game: Game;
    is_temp_game: boolean = false;

    turn: COLORS_T = COLORS.WHITE;

    constructor(is_temp_game: boolean = false) {
        for (let i = 0; i < 36; i++) {
            this.figures.push(new Figure(new Position(0, 0), COLORS.BLACK, get_default_figure_by_name('pawn')));
        }
        this.is_temp_game = is_temp_game;
        if (!is_temp_game) {
            this.temp_game = new Game(true);
        }
    }

    find_free_index(): number {
        let index = 0;
        while (index < this.figures.length && this.figures[index].is_alive) {
            index++;
        }
        if (index == this.figures.length) {
            this.figures.push(new Figure(new Position(0, 0), COLORS.BLACK, get_default_figure_by_name('pawn')));
        }
        return index;
    }

    remove_all_figures(): void {
        for (let figure of this.figures) {
            figure.is_alive = false;
        }
    }

    add_figure(position: Position, color: COLORS_T, figure_index: number): void {
        let index = this.find_free_index();
        this.figures[index].init(position, color, figure_index);
    }

    get_empty_figure(): Figure {
        let index = this.find_free_index();
        return this.figures[index];
    }

    has_check_on(color: COLORS_T): boolean {
        let moves = this.get_all_moves(false);
        for (let move of moves) {
            if (move.hit_figure_id == get_default_figure_by_name("king") && move.hit_figure_color == color) {
                return true;
            }
        }
        return false;
    }

    init(): void {
        if (!this.is_temp_game) {
            this.temp_game.init();
        }

        this.history = [];

        this.remove_all_figures();
        this.add_figure(new Position(-5, 0), COLORS.BLACK, get_default_figure_by_name('bishop'));
        this.add_figure(new Position(-4, 0), COLORS.BLACK, get_default_figure_by_name('bishop'));
        this.add_figure(new Position(-3, 0), COLORS.BLACK, get_default_figure_by_name('bishop'));
        this.add_figure(new Position(-5, 1), COLORS.BLACK, get_default_figure_by_name('queen'));
        this.add_figure(new Position(-5, 2), COLORS.BLACK, get_default_figure_by_name('knight'));
        this.add_figure(new Position(-5, 3), COLORS.BLACK, get_default_figure_by_name('rook'));
        this.add_figure(new Position(-4, -1), COLORS.BLACK, get_default_figure_by_name('king'));
        this.add_figure(new Position(-3, -2), COLORS.BLACK, get_default_figure_by_name('knight'));
        this.add_figure(new Position(-2, -3), COLORS.BLACK, get_default_figure_by_name('rook'));
        this.add_figure(new Position(-5, 4), COLORS.BLACK, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(-4, 3), COLORS.BLACK, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(-3, 2), COLORS.BLACK, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(-2, 1), COLORS.BLACK, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(-1, 0), COLORS.BLACK, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(-1, -1), COLORS.BLACK, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(-1, -2), COLORS.BLACK, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(-1, -3), COLORS.BLACK, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(-1, -4), COLORS.BLACK, get_default_figure_by_name('pawn'));
    
        this.add_figure(new Position(5, 0), COLORS.WHITE, get_default_figure_by_name('bishop'));
        this.add_figure(new Position(4, 0), COLORS.WHITE, get_default_figure_by_name('bishop'));
        this.add_figure(new Position(3, 0), COLORS.WHITE, get_default_figure_by_name('bishop'));
        this.add_figure(new Position(4, 1), COLORS.WHITE, get_default_figure_by_name('queen'));
        this.add_figure(new Position(3, 2), COLORS.WHITE, get_default_figure_by_name('knight'));
        this.add_figure(new Position(2, 3), COLORS.WHITE, get_default_figure_by_name('rook'));
        this.add_figure(new Position(5, -1), COLORS.WHITE, get_default_figure_by_name('king'));
        this.add_figure(new Position(5, -2), COLORS.WHITE, get_default_figure_by_name('knight'));
        this.add_figure(new Position(5, -3), COLORS.WHITE, get_default_figure_by_name('rook'));
        this.add_figure(new Position(5, -4), COLORS.WHITE, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(4, -3), COLORS.WHITE, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(3, -2), COLORS.WHITE, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(2, -1), COLORS.WHITE, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(1, 0), COLORS.WHITE, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(1, 1), COLORS.WHITE, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(1, 2), COLORS.WHITE, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(1, 3), COLORS.WHITE, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(1, 4), COLORS.WHITE, get_default_figure_by_name('pawn'));
    }

    execute_move(move: Move): void {
        if (move.hit_figure_id != -1) {
            this.get_figure(move.new_position).is_alive = false;
        }
        
        let figure = this.get_figure(move.old_position); 
        figure.set_position(move.new_position);
        figure.figure = move.new_figure_id;

        this.turn = this.turn == COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
        this.history.push(move);
    }

    undo_move(): void {
        let move = this.history.pop();
        if (move) {
            let figure = this.get_figure(move.new_position);
            figure.set_position(move.old_position);
            figure.figure = move.old_figure_id;
            if (move.hit_figure_id != -1) {
                this.add_figure(move.new_position, move.hit_figure_color, move.hit_figure_id);
            }
            this.turn = this.turn == COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
        }
    }

    get_moves(postion: Position): Move[] {
        let figure = this.get_figure(postion);
        if (figure && figure.is_alive && figure.color == this.turn) {
            return figure.get_moves(this);
        }
        return [];
    }

    get_all_moves(cfc: boolean = true): Move[] {
        let moves: Move[] = [];
        this.figures.forEach(figure => {
            if (figure.is_alive && figure.color == this.turn) {
                moves = moves.concat(figure.get_moves(this, cfc));
            }
        });
        return moves;
    }

    is_valid_move(move: Move): boolean {
        let moves = this.get_moves(move.old_position);
        for (let m of moves) {
            if (m.equals(move)) {
                return true;
            }
        }
        return false;
    }

    get_last_move(): Move | undefined {
        if (this.history.length > 0) {
            return this.history[this.history.length - 1];
        }
        return undefined;
    }

    clone_into(game: Game): void {
        game.remove_all_figures();
        game.turn = this.turn;
        this.figures.forEach(figure => {
            if (figure.is_alive) {
                figure.clone_into(game.get_empty_figure())    
            }
        });
    }

    is_valid_position(position: Position): boolean {
        let x = position.x;
        let z = position.z;
        let y = - x - z;
        if (Math.abs(x) > this.size || Math.abs(y) > this.size || Math.abs(z) > this.size) {
            return false;
        }
        return true;
    }
    
    get_figure(position: Position): Figure | undefined {
        if (!this.is_valid_position(position)) {
            return undefined;
        }
        for (let figure of this.figures) {
            if (figure.position.equals(position) && figure.is_alive) {
                return figure;
            }
        }
        return undefined;
    }

    to_string(): string {
        let out = ``;
        let lines = this.size * 2 + 1
        let figures = this.size + 1;
        for (let line = 0; line < lines; line++) {
            let spaces = Math.max(this.size - line, 0);
            let line_string = '';
            for (let i = 0; i < spaces; i++) {
                line_string += ' ';
            }
            let x = line < lines/2 ? -line : -Math.floor(lines/2); 
            for (let i = 0; i < figures; i++) {
                let position = new Position(x, -Math.floor(lines/2) + line);
                let figure = this.get_figure(position);
                if (figure) {
                    line_string += FIGURES[figure.figure].symbol;
                } else {
                    line_string += '#';
                }
                x++;
            }   
            if (line < Math.floor(lines/2)) {
                figures++;
            } else {
                figures--;
            }
            out += line_string + '\n';
        }
        return out;
    }
}