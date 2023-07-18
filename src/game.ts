import { COLORS, FIGURES, Figure, get_default_figure_by_name, COLORS_T } from './figure';
import { Position } from "./position";
import { DEFAULT_FIGURES_I } from '../dist/figure';

export class Game {
    figures: Figure[] = [];
    size: number = 5;

    constructor() {
        for (let i = 0; i < 36; i++) {
            this.figures.push(new Figure(new Position(0, 0, 0), COLORS.BLACK, get_default_figure_by_name('pawn')));
        }
    }

    find_free_index(): number {
        let index = 0;
        while (index < this.figures.length && this.figures[index].is_alive) {
            index++;
        }
        if (index == this.figures.length) {
            this.figures.push(new Figure(new Position(0, 0, 0), COLORS.BLACK, get_default_figure_by_name('pawn')));
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

    init(): void {
        this.remove_all_figures();
        this.add_figure(new Position(-5, 5, 0), COLORS.BLACK, get_default_figure_by_name('bishop'));
        this.add_figure(new Position(-4, 4, 0), COLORS.BLACK, get_default_figure_by_name('bishop'));
        this.add_figure(new Position(-3, 3, 0), COLORS.BLACK, get_default_figure_by_name('bishop'));
        this.add_figure(new Position(-5, 4, 1), COLORS.BLACK, get_default_figure_by_name('queen'));
        this.add_figure(new Position(-5, 3, 2), COLORS.BLACK, get_default_figure_by_name('knight'));
        this.add_figure(new Position(-5, 2, 3), COLORS.BLACK, get_default_figure_by_name('rook'));
        this.add_figure(new Position(-4, 5, -1), COLORS.BLACK, get_default_figure_by_name('king'));
        this.add_figure(new Position(-3, 5, -2), COLORS.BLACK, get_default_figure_by_name('knight'));
        this.add_figure(new Position(-2, 5, -3), COLORS.BLACK, get_default_figure_by_name('rook'));
        this.add_figure(new Position(-5, 1, 4), COLORS.BLACK, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(-4, 1, 3), COLORS.BLACK, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(-3, 1, 2), COLORS.BLACK, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(-2, 1, 1), COLORS.BLACK, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(-1, 1, 0), COLORS.BLACK, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(-1, 2, -1), COLORS.BLACK, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(-1, 3, -2), COLORS.BLACK, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(-1, 4, -3), COLORS.BLACK, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(-1, 5, -4), COLORS.BLACK, get_default_figure_by_name('pawn'));
    
        this.add_figure(new Position(5, -5, 0), COLORS.WHITE, get_default_figure_by_name('bishop'));
        this.add_figure(new Position(4, -4, 0), COLORS.WHITE, get_default_figure_by_name('bishop'));
        this.add_figure(new Position(3, -3, 0), COLORS.WHITE, get_default_figure_by_name('bishop'));
        this.add_figure(new Position(4, -5, 1), COLORS.WHITE, get_default_figure_by_name('queen'));
        this.add_figure(new Position(3, -5, 2), COLORS.WHITE, get_default_figure_by_name('knight'));
        this.add_figure(new Position(2, -5, 3), COLORS.WHITE, get_default_figure_by_name('rook'));
        this.add_figure(new Position(5, -4, -1), COLORS.WHITE, get_default_figure_by_name('king'));
        this.add_figure(new Position(5, -3, -2), COLORS.WHITE, get_default_figure_by_name('knight'));
        this.add_figure(new Position(5, -2, -3), COLORS.WHITE, get_default_figure_by_name('rook'));
        this.add_figure(new Position(5, -1, -4), COLORS.WHITE, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(4, -1, -3), COLORS.WHITE, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(3, -1, -2), COLORS.WHITE, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(2, -1, -1), COLORS.WHITE, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(1, -1, 0), COLORS.WHITE, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(1, -2, 1), COLORS.WHITE, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(1, -3, 2), COLORS.WHITE, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(1, -4, 3), COLORS.WHITE, get_default_figure_by_name('pawn'));
        this.add_figure(new Position(1, -5, 4), COLORS.WHITE, get_default_figure_by_name('pawn'));
    }

    clone(game: Game): void {
        game.remove_all_figures();
        this.figures.forEach(figure => {
            if (figure.is_alive) {
                figure.clone(game.get_empty_figure())    
            }
        });
    }

    is_valid_position(position: Position): boolean {
        let x = position.x;
        let y = position.y;
        let z = position.z;
        if (x + y + z != 0) {
            return false;
        }
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
            if (figure.position.equals(position)) {
                return figure;
            }
        }
        return undefined;
    }

    to_string(): string {
        let out = '';
        let lines = this.size * 2 + 1
        let figures = this.size + 1;
        for (let line = 0; line < lines; line++) {
            let spaces = Math.max(this.size - line, 0);
            let line_string = '';
            for (let i = 0; i < spaces; i++) {
                line_string += ' ';
            }
            let x = line < lines/2 ? -line : -Math.floor(lines/2); 
            let y = line < lines/2 ? Math.floor(lines/2) : Math.floor(lines/2) - line + this.size;
            for (let i = 0; i < figures; i++) {
                let position = new Position(x, y, -Math.floor(lines/2) + line);
                let figure = this.get_figure(position);
                if (figure) {
                    line_string += FIGURES[figure.figure].symbol;
                } else {
                    line_string += '#';
                }
                x++;
                y--;
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