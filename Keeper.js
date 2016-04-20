'use strict'

class Keeper {
  constructor(options) {
    this.el = document.querySelector(options.className);
    this.field = options.field;
    this.directionY = 0;
    this.top;
    this.bottom;
    this.width = this.el.offsetWidth;
    this._height = this.el.offsetHeight;
    this._init();
  }

  move(value) {
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

let keeperLeftObj = new Keeper({
  className: '.keeperLeft',
  field: fieldObj
});

let keeperRighttObj = new Keeper({
  className: '.keeperRight',
  field: fieldObj
});
console.log(keeperLeftObj);
