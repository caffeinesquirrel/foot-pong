'use strict'

class Ball {
  constructor(options) {
    this.el = document.querySelector('.ball');
    this.playerL = options.playerL;
    this.playerR = options.playerR;
    this.field = options.field;
    this.directionX = 0; //direction = -1 || 0 || 1
    this.directionY = 0; //direction = -1 || 0 || 1
    this._speedX = .2;
    this._speedY = .1;
    this._width = this.el.offsetWidth;
    this._height = this.el.offsetHeight;
    this._init();
  }

  move(dTime) {
    let distanceX = dTime * this._speedX * this.directionX;
    let distanceY = dTime * this._speedY * this.directionY;
    return this._moveBall(distanceX, distanceY);
  }

  _init() {
    let min = -2;
    let max = 2;
    do {
      this.directionX = Math.round(min - 0.5 + Math.random() * (max - min + 1));
      this.directionY = Math.round(min - 0.5 + Math.random() * (max - min + 1));
    } while (this.directionX === 0 || this.directionY === 0);
  }

  _getFieldSizes(valueX, valueY) {
    let coordsBall = this.el.getBoundingClientRect();
    let coordX = (coordsBall.left + valueX) - this.field.coordX;
    let coordY = (coordsBall.top + valueY) - this.field.coordY;

    return {
      ballX: coordX,
      ballY: coordY,

      maxX: this.field.clientWidth - (this._width),
      maxY: this.field.clientHeight - (this._height),

      keepL: this.playerL.width,
      keepR: (this.field.clientWidth - (this._width)) - this.playerR.width,

      goalL: this._isKeeperHere(this.playerL, coordY),
      goalR: this._isKeeperHere(this.playerR, coordY),
    }
  }

  _isKeeperHere(keeper, ballTop) {

    let ballBottom = ballTop + this._height;
    return ((ballTop >= keeper.top && ballTop <= keeper.bottom) || (ballBottom >= keeper.top && ballBottom <= keeper.bottom)) ? true : false;
  }

  _moveBall(valueX, valueY) {
    let info = this._getFieldSizes(valueX, valueY);
    let left = 0;
    let top = 0;
    let goal = 0;
    let changeSpeed = true;

    if (info.ballX <= info.keepL && info.goalL) {
      left = info.keepL;
      this.directionX = 1;
    } else if (info.ballX >= info.keepR && info.goalR) {
      left = info.keepR;
      this.directionX = -1;
    } else if (info.ballX >= 0 && info.ballX <= info.maxX) {
      left = info.ballX;
      changeSpeed = false;
    } else if (info.ballX > info.maxX) {
      left = info.maxX;
      this.directionX = -1;
      goal = 1;
    } else if (info.ballX <= 0) {
      this.directionX = 1
      goal = -1;
    }

    if (info.ballY > info.maxY) {
      top = info.maxY;
      this.directionY = -1;
      changeSpeed = true;
    } else if (info.ballY >= 0 && info.ballY <= info.maxY) {
      top = info.ballY;

    } else {
      this.directionY = 1;
         changeSpeed = true;
    }

    this.el.style.left = left + 'px';
    this.el.style.top = top + 'px';

    if (changeSpeed) {
      let r = -0.05 + Math.random() * (0.05 * 2);
      this._speedX += this._speedX > .5 ? 0 : 0.004;
      this._speedY = this._speedY + r;
    }

    return goal;
  }

}
