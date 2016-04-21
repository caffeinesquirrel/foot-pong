'use strict'

class Keeper {
  constructor(options) {
    this.el = document.querySelector(options.className);
    this.field = options.field;
    this.directionY = 0;  //direction = -1 || 0 || 1
    this.top;
    this.bottom;
    this.width = this.el.offsetWidth;

    this._height = this.el.offsetHeight;
    this._speed = .2;
    this._init();
  }

  move(dTime) {

    if (!this.directionY) {
      return; 
    };

    let value = this._speed * dTime * this.directionY;
    let keeperY = this._getTopInField() + value;
    let maxY = this.field.clientHeight - this._height;
    let top = 0;

    if (keeperY > maxY) {
      top = maxY;
    }

    if (keeperY >= 0 && keeperY <= maxY) {
      top = keeperY;
    }

    this.el.style.top = top + 'px';
    this.top = top;
    this.bottom = top + this._height;
  }

  _init() {
    this.top = this._getTopInField();
    this.bottom = this.top + this._height;
  }

  _getTopInField() {
    return this.el.getBoundingClientRect().top - this.field.coordY;
  }
}
