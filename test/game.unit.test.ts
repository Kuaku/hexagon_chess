//Contains unit test for the class Game from src\game.ts
import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { mock, instance } from 'ts-mockito';
import { Game } from '../src/game';
import { Position } from '../src/position';
import { Figure } from '../src/figure';
import { FIGURES } from '../src/figure';

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
        this._game.clone(game);
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
        this._game.is_valid_position(new Position(0, 0, 0)).should.equal(true);
        this._game.is_valid_position(new Position(5, 5, 5)).should.equal(false);
        this._game.is_valid_position(new Position(-5, -5, -5)).should.equal(false);
        this._game.is_valid_position(new Position(5, 0, -5)).should.equal(true);
        this._game.is_valid_position(new Position(5, 0, -6)).should.equal(false);
        this._game.is_valid_position(new Position(0, 6, -6)).should.equal(false);
    }
}