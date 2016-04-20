'use strict'

class Game {
  constructor(options) {
    //direction = -1 || 0 || 1
    this.ballDirectionX = 0;
    this.ballDirectionY = 0;
    this.playerL = options.playerL;
    this.playerR = options.playerR;

    this.timeBefore = Date.now();
    this.speedBallX = .2;
    this.speedBallY = .1;
    this._resultLeft = document.querySelector('.leftResult');
    this._resultRight = document.querySelector('.rightResult');
  }

  start() {
    this._initBallDirection();
    this._initKeyEvents();
    this._pulse();
  }

  _initBallDirection() {
    let min = -2;
    let max = 2;
    do {
      this.ballDirectionX = Math.round(min - 0.5 + Math.random() * (max - min + 1));
      this.ballDirectionY = Math.round(min - 0.5 + Math.random() * (max - min + 1));
    } while (this.ballDirectionX === 0 || this.ballDirectionY === 0);
  }

  _pulse() {
    this._move();
    window.requestAnimationFrame(() => this._pulse.call(this));
  }

  _move() {

    if (this.playerR.directionY) {
      this._movePlayer(this.playerR);
    }

    if (this.playerL.directionY) {
      this._movePlayer(this.playerL);
    }

    if (this.ballDirectionX || this.ballDirectionY) {
      let ballChanges = this._moveBall();
      this._setBallNextParam(ballChanges);
      this._setGameScore(ballChanges.goal);
    }
    this.timeBefore = Date.now();
  }

  _movePlayer(keeper) {
    keeper.move(STEP * keeper.directionY);
  }

  _moveBall() {
    let dTime = Date.now() - this.timeBefore;
    let distanceX = dTime * this.speedBallX;
    let distanceY = dTime * this.speedBallY;
    return ballO.move(this.ballDirectionX * distanceX, this.ballDirectionY * distanceY);
  }

  _setBallNextParam(ballChanges) {

    if ((ballChanges.xDirectionChange || ballChanges.yDirectionChange)) {
      let r = -0.05 + Math.random() * (0.05 * 2);
      this.speedBallY = this.speedBallY + r;
      this.speedBallX += this.speedBallX > .5 ? 0 : 0.004;
    }

    if (ballChanges.xDirectionChange) {
      this.ballDirectionX = ballChanges.xDirectionChange;
    }

    if (ballChanges.yDirectionChange) {
      this.ballDirectionY = ballChanges.yDirectionChange;
    }
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

let gamePlay = new Game( {
    playerL: keeperLeftObj,
    playerR: keeperRighttObj,
    ball: keeperLeftObj,
  });

console.log(gamePlay);

gamePlay.start();

document.body.onclick = (event) => {
//  let kCoords = fieldObj.el.getBoundingClientRect();
  //console.log('m:',  event.clientY, 'f-m:', event.clientY - kCoords.top - fieldObj.el.clientTop);
}
