//Contains unit test for the class Game from src\game.ts
import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { mock, instance } from 'ts-mockito';
import { Game } from '../src/game';
import { Position } from '../src/position';
import { Figure, get_default_figure_by_name } from '../src/figure';
import { FIGURES } from '../src/figure';
import { Move } from '../src/move';

_chai.should();

@suite class GameTest {

    private _game: Game;

    before() {
        this._game = new Game();
        this._game.init();
    }

    @test 'Game should be initialized'() {
        this._game.figures.length.should.equal(36);
        this._game.size.should.equal(5);
    }

    @test 'Game should be cloned'() {
        let game = new Game();
        this._game.clone_into(game);
        game.figures.length.should.equal(36);
        game.size.should.equal(5);

        game.size = 6;
        game.figures.pop();
        game.figures.length.should.equal(35);
        game.size.should.equal(6);
        this._game.figures.length.should.equal(36);
        this._game.size.should.equal(5);
    }

    @test 'Game should be valid position'() {
        this._game.is_valid_position(new Position(0, 0)).should.equal(true);
        this._game.is_valid_position(new Position(5, 5)).should.equal(false);
        this._game.is_valid_position(new Position(-5, -5)).should.equal(false);
        this._game.is_valid_position(new Position(5, -5)).should.equal(true);
        this._game.is_valid_position(new Position(5, -6)).should.equal(false);
        this._game.is_valid_position(new Position(0, -6)).should.equal(false);
    }

    @test 'Execute simpel move'() {
        this._game.init();
        console.log(this._game.get_figure(new Position(0, 0)));
        let move = new Move(new Position(-1, 0), new Position(0, 0), get_default_figure_by_name('pawn'), get_default_figure_by_name('pawn'));
        this._game.execute_move(move);
        this._game.get_figure(new Position(0, 0)).should.not.equal(undefined);
    }

    @test async 'test'() {
        console.log(this._game.to_string());
        //Select random move and repeat with sleep
        for (let i = 0; i < 100; i++) {
            //Get all moves
            let moves = this._game.get_all_moves();
            //Select random move
            let move = moves[Math.floor(Math.random() * moves.length)];
            //Execute move
            this._game.execute_move(move);
            console.log("-------------------");
            console.log(move.to_string());
            console.log(this._game.to_string());
            console.log("-------------------");
            //Sleep
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}