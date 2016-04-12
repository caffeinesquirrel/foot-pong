'use strict'

const STEP = 5; // pix/tick -> pix/sec

const DOWNR = 40;
const UPR = 38;
const DOWNL = 83;
const UPL = 87;

let ball = document.getElementById('ball');
let field = document.getElementById('field');
var timerId;

/////////////////////////
function GoalKeeper(keeper) {
  let el = document.getElementById(keeper);
  this.elem = el;
  this.width = el.offsetWidth;
  this.height = el.offsetHeight;
  this.top = 0;
  this.bottom =  this.top + el.offsetHeight;
}

GoalKeeper.prototype.move = function(value) {
  let fieldTop = field.getBoundingClientRect().top;
  let keeperTop = this.elem.getBoundingClientRect().top;
  let keeperY = (keeperTop + value) - fieldTop - field.clientTop;
  let maxY = field.clientHeight - this.height;

  let top = 0;

  if (keeperY > maxY) {
    top = maxY;
  }

  if (keeperY >= 0 && keeperY <= maxY) {
    top = keeperY;
  }

  this.elem.style.top = top + 'px';
  this.top = top;
  this.bottom = top + this.height;
}

/////////////////////////////////
function Ball() {
  let elem = document.getElementById('ball');
  this.elem = elem;
  this.width = elem.offsetWidth;
  this.height = elem.offsetHeight;
}

Ball.prototype.getFieldSizes = function(valueX, valueY) {
  let coordsField = field.getBoundingClientRect();
  let coordsBall = this.elem.getBoundingClientRect();

  let coordX = (coordsBall.left + valueX) - (coordsField.left - field.clientLeft);
  let coordY = (coordsBall.top + valueY) - (coordsField.top - field.clientTop);

  return {
    ballX: coordX,
    ballY: coordY,

    minX: this.width * 0.5,
    maxX: field.clientWidth - (this.width * 0.5),
    minY: this.height * 0.5,
    maxY: field.clientHeight - (this.height * 0.5),

    keepL: (this.height * 0.5) + keeperLeft.width,
    keepR: (field.clientWidth - (this.width * 0.5)) - keeperRight.width,

    goalL: this.isKeeperHere(keeperLeft, coordY),
    goalR: this.isKeeperHere(keeperRight, coordY),
  }
}

Ball.prototype.isKeeperHere = function(keeper, ballTop) {
    let ballBottom = ballTop + this.height;
    return ( (ballTop >= keeper.top && ballTop <= keeper.bottom)
    || (ballBottom >= keeper.top && ballBottom <= keeper.bottom) ) ? true : false;
}

Ball.prototype.move = function(valueX, valueY) {
  let info = this.getFieldSizes(valueX, valueY);
  //console.log(info);
  let left = info.minX;
  let top = info.minY;
  let directionX = 1;
  let directionY = 1;
  let goal = 0;

  if (info.ballX <= info.keepL && info.goalL)  {
     left = info.keepL;
     directionY = 1;
  } else if (info.ballX >= info.keepR && info.goalR) {
      left = info.keepR;
      directionX = -1;
  } else if (info.ballX >= info.minX && info.ballX <= info.maxX) {
     left = info.ballX;
     directionX = 0;
  } else if (info.ballX > info.maxX) {
    left = info.maxX;
    directionX = -1;
    goal = 1;
  } else if (info.ballX <= info.minX) {
    goal = -1;
  }

  if (info.ballY > info.maxY) {
    top = info.maxY;
    directionY = -1;
  } else if (info.ballY >= info.minY && info.ballY <= info.maxY) {
    top = info.ballY;
    directionY = 0
  }

  this.elem.style.left = left + 'px';
  this.elem.style.top = top + 'px';

  return {
    x: directionX,
    y: directionY,
    goal: goal,
  }
}

////////////////////////////////////////////
let keeperLeft = new GoalKeeper('keeperLeft');
keeperLeft.top = keeperLeft.elem.getBoundingClientRect().top - field.getBoundingClientRect().top - field.clientTop;
keeperLeft.bottom =  keeperLeft.top + keeperLeft.elem.offsetHeight;
let keeperRight = new GoalKeeper('keeperRight');
keeperRight.top = keeperRight.elem.getBoundingClientRect().top - field.getBoundingClientRect().top - field.clientTop;
keeperRight.bottom =  keeperRight.top + keeperRight.elem.offsetHeight;
let ballO = new Ball();
