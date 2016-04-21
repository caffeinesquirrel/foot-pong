'use strict'

class Field {
  constructor(options) {
    this.el = document.querySelector('.field');
    this.clientHeight = this.el.clientHeight;
    this.clientWidth = this.el.clientWidth;
    this.coordX;
    this.coordY;
    this._init();
  }

  _init() {
    let coords = this.el.getBoundingClientRect();
    this.coordX = coords.left + this.el.clientLeft;
    this.coordY = coords.top + this.el.clientTop;
  }
}
