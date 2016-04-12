'use strict'

class Game {
  constructor(options) {
    this.playerL = 0;
    this.playerR = 0;
    this.ballX = 0;
    this.ballY = 0;
    this.BEAT = 1000/30;
  }

  start() {
    this._randomDirection();
    this._keyDownEvent();
    this._pulse();

  }

  _randomDirection() {
    let min = -2;
    let max = 2;

    do {
      this.ballX = Math.round( min - 0.5 + Math.random() * (max - min + 1) );
      this.ballY = Math.round( min - 0.5 + Math.random() * (max - min + 1) );
    } while(this.ballX === 0 || this.ballY === 0);
  }

  _getDirection() {
    if (this.playerR) {
      keeperRight.move(STEP * this.playerR);
      this.playerR = 0;
    }

    if (this.playerL) {
      keeperLeft.move(STEP * this.playerL);
      this.playerL = 0;
    }

    if(this.ballX) {
      let direction = ballO.move(STEP * this.ballX, STEP * this.ballY);
      if (direction.x) {
        this.ballX = direction.x;
      }
      if (direction.y) {
        this.ballY = direction.y;
      }
    }
  }

  _pulse() {
    this._getDirection();
    setTimeout(() => this._pulse.call(this), this.BEAT);
  }

  _moveBall() {

  }

  _moveKeeper() {

  }

  _keyDownEvent() {
    document.addEventListener('keydown', () => this._onKeyDown.call(this, event));
  }

  _onKeyDown(event) {
    if (event.keyCode === DOWNR) {
      this.playerR = 1;
    }

    if (event.keyCode === UPR) {
      this.playerR = -1;
    }

    if (event.keyCode === DOWNL) {
      this.playerL = 1;
    }

    if (event.keyCode === UPL) {
      this.playerL = -1;
    }
  }
}

let gamePlay = new Game();
gamePlay.start();
