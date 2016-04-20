'use strict'

const STEP = 5; // pix/tick -> pix/sec

const DOWNR = 40;
const UPR = 38;
const DOWNL = 83;
const UPL = 87;

let ball = document.getElementById('ball');
let field = document.querySelector('.field');

/////////////////////////////////
function Ball(options) {
  let elem = document.getElementById('ball');
  this.elem = elem;
  this.width = elem.offsetWidth;
  this.height = elem.offsetHeight;

  this.playerL = options.playerL;
  this.playerR = options.playerR;
  this.field = options.field;
}

Ball.prototype.getFieldSizes = function(valueX, valueY) {

  let coordsBall = this.elem.getBoundingClientRect();
  let coordX = (coordsBall.left + valueX)  - this.field.coordX;
  let coordY =  (coordsBall.top + valueY) - this.field.coordY;

  return {
    ballX: coordX,
    ballY: coordY,

    minX: 0,
    maxX: field.clientWidth - (this.width),
    minY: 0,
    maxY: field.clientHeight - (this.height),

    keepL: this.playerL.width,
    keepR: (field.clientWidth - (this.width)) - this.playerR.width,

    goalL: this.isKeeperHere(this.playerL, coordY),
    goalR: this.isKeeperHere(this.playerR, coordY),
  }
}

Ball.prototype.isKeeperHere = function(keeper, ballTop) {
  let ballBottom = ballTop + this.height;

  return ( (ballTop >= keeper.top && ballTop <= keeper.bottom)
  || (ballBottom >= keeper.top && ballBottom <= keeper.bottom) ) ? true : false;
}

Ball.prototype.move = function(valueX, valueY, distanceX) {
  let info = this.getFieldSizes(valueX, valueY, distanceX);
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
    xDirectionChange: directionX,
    yDirectionChange: directionY,
    goal: goal,
  }
}

let ballO = new Ball ({
    playerL: keeperLeftObj,
    playerR: keeperRighttObj,
    field: fieldObj,
  });
