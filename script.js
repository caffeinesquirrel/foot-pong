'use strickt'

function GoalKeeper(keeper) {
  let elem = document.getElementById(keeper);
  this.elem = elem,
  this.width = elem.offsetWidth,
  this.height = elem.offsetHeight
}

const STEP = 5;
let ball = document.getElementById('ball');
let field = document.getElementById('field');
let keeperLeft = new GoalKeeper('keeperLeft');
let keeperRight = new GoalKeeper('keeperRight');

document.onkeydown = (event) => {
  if (event.keyCode === 40) {
    setNewPositon(keeperRight, STEP);
  }

  if (event.keyCode === 38) {
    setNewPositon(keeperRight, -STEP);
  }

  if (event.keyCode === 83) {
    setNewPositon(keeperLeft, STEP);
  }
  if (event.keyCode === 87) {
    setNewPositon(keeperLeft, -STEP);
  }
}

function setNewPositon(object, value) {
  let top = object.elem.getBoundingClientRect().top;
  top += value;
  object.elem.style.top = getNewPosition(object, top) + 'px';
}

function getNewPosition(object, coord) {
  let fieldCoords = field.getBoundingClientRect();
  let mouseY = coord - fieldCoords.top - field.clientTop;
  let fieldMaxY = field.clientHeight - object.height;
  let top = 0;

  if (mouseY > fieldMaxY) {
    top = fieldMaxY;
  }

  if (mouseY >= 0 && mouseY <= fieldMaxY) {
    top = mouseY;
  }
  return top
}
