'use strict'

class Game {
  constructor(options) {
    this.playerL = 0;
    this.playerR = 0;
    this.ballX = 0;
    this.ballY = 0;
    this.BEAT = 1000/30;
    this._resultLeft = document.querySelector('.leftResult');
    this._resultRight = document.querySelector('.rightResult');
  }

  start() {
    this._randomDirection();
    this._keyEvents();
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
    }

    if (this.playerL) {
      keeperLeft.move(STEP * this.playerL);
    }

    if(this.ballX || this.ballY) {
      let direction = ballO.move(STEP * this.ballX, STEP * this.ballY);
      if (direction.x) {
        this.ballX = direction.x;
      }
      if (direction.y) {
        this.ballY = direction.y;
      }

      if(direction.goal) {
        this._gameScore(direction.goal);
      }
    }
  }

  _pulse() {
    this._getDirection();
    setTimeout(() => this._pulse.call(this), this.BEAT);
  }

  _gameScore(goal) {
    if (goal < 0) {
     this._resultLeft.innerHTML = +(this._resultLeft.innerHTML) + 1;
    } else {
     this._resultRight.innerHTML = +(this._resultRight.innerHTML) + 1;
    }
  }

  _moveBall() {

  }

  _moveKeeper() {

  }

  _keyEvents() {
    document.addEventListener('keydown', () => this._onKeyDown.call(this, event));
    document.addEventListener('keyup', () => this._onKeyUp.call(this, event));
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

  _onKeyUp(event) {

    if (event.keyCode === DOWNR  || event.keyCode === UPR) {
      this.playerR = 0;
    }

    if (event.keyCode === DOWNL || event.keyCode === UPL) {
      this.playerL = 0;
    }
  }
}

let gamePlay = new Game();
gamePlay.start();
