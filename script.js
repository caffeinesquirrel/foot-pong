'use strict'

const STEP = 5;

const DOWNR = 40;
const UPR = 38;
const DOWNL = 83;
const UPL = 87;

const TIK = 1000/30;

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

let game = {
   playerL: 0,
   playerR: 0,
   ballX: 0,
   ballY: 0,
   check : function () {
    // console.log('geme', ballO);
   },
}

function tikTak() {
  if (timerId) {
     clearTimeout(timerId);
     console.log('Stop');
     timerId = undefined;
     return;
   }

   let min = -2;
   let max = 2;
   game.ballX = Math.round( min - 0.5 + Math.random() * (max - min + 1) );
   game.ballY = Math.round( min - 0.5 + Math.random() * (max - min + 1) );
   console.log(game.ballX, game.ballY);
   timerId = setTimeout(function tick() {
        game.check();
       checkAll();
     timerId = setTimeout(tick, TIK);
    }, TIK);
}

function checkAll() {
   if (game.playerR) {
     keeperRight.move(STEP * game.playerR);
     game.playerR = 0;
   }

   if (game.playerL) {
     keeperLeft.move(STEP * game.playerL);
     game.playerL = 0;
   }

   if(game.ballX) {
     let direction = ballO.move(STEP * game.ballX, STEP * game.ballY);
     //console.log(direction.x, direction.y);
     if (direction.x) {
       game.ballX = direction.x;
     }
     if (direction.y) {
       game.ballY = direction.y;
     }
   }
}


document.onkeydown = (event) => {

  if (event.keyCode === DOWNR) {
    game.playerR = 1;
  }

  if (event.keyCode === UPR) {
    game.playerR = -1;
  }

  if (event.keyCode === DOWNL) {
    game.playerL = 1;
  }

  if (event.keyCode === UPL) {
    game.playerL = -1;
  }
}
