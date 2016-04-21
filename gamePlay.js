'use strict'

const DOWNR = 40;
const UPR = 38;
const DOWNL = 83;
const UPL = 87;

class Game {
  constructor(options) {
    this.playerL = options.playerL;
    this.playerR = options.playerR;
    this.ball = options.ball;
    this.timeBefore = Date.now();
    this._resultLeft = document.querySelector('.leftResult');
    this._resultRight = document.querySelector('.rightResult');
  }

  start() {
    this._initKeyEvents();
    this._pulse();
  }

  _pulse() {
    this._move();
    window.requestAnimationFrame(() => this._pulse.call(this));
  }

  _move() {
    let dTime = Date.now() - this.timeBefore;

    this.playerR.move(dTime);
    this.playerL.move(dTime);

    let result = this.ball.move(dTime);
    this._setGameScore(result);

    this.timeBefore = Date.now();
  }

  _setGameScore(goal) {
    if (goal < 0) {
      this._resultLeft.innerHTML = +(this._resultLeft.innerHTML) + 1;
    };

    if (goal > 0) {
      this._resultRight.innerHTML = +(this._resultRight.innerHTML) + 1;
    }
  }

  _initKeyEvents() {
    document.addEventListener('keydown', () => this._onKeyDown.call(this, event));
    document.addEventListener('keyup', () => this._onKeyUp.call(this, event));
  }

  _onKeyDown(event) {
    if (event.keyCode === DOWNR) {
      this.playerR.directionY = 1;
    }

    if (event.keyCode === UPR) {
      this.playerR.directionY = -1;
    }

    if (event.keyCode === DOWNL) {
      this.playerL.directionY = 1;
    }

    if (event.keyCode === UPL) {
      this.playerL.directionY = -1;
    }
  }

  _onKeyUp(event) {

    if (event.keyCode === DOWNR || event.keyCode === UPR) {
      this.playerR.directionY = 0;
    }

    if (event.keyCode === DOWNL || event.keyCode === UPL) {
      this.playerL.directionY = 0;
    }
  }
}

let field = new Field();
let keeperLef = new Keeper({
  className: '.keeperLeft',
  field: field
});
let keeperRight = new Keeper({
  className: '.keeperRight',
  field: field
});
let ball = new Ball({
  playerL: keeperLef,
  playerR: keeperRight,
  field: field,
});
let gamePlay = new Game({
  playerL: keeperLef,
  playerR: keeperRight,
  ball: ball,
});

gamePlay.start();
