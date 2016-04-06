'use strict'

field.onclick = function(event) {

  let fieldCoords = field.getBoundingClientRect();

  let mouseX = event.clientX - fieldCoords.left - field.clientLeft;
  let mouseY = event.clientY - fieldCoords.top - field.clientTop;

  let halfWidth = ball.offsetWidth * 0.5;
  let fieldMaxX = field.clientWidth - halfWidth;

  let halfHeight = ball.offsetHeight * 0.5;
  let fieldMaxY = field.clientHeight - halfHeight;

  let left = halfWidth;
  let top = halfHeight;

  if (mouseX > fieldMaxX) {
    left = fieldMaxX;
  }

  if (mouseX >= halfWidth && mouseX <= fieldMaxX) {
    left = mouseX;
  }

  if (mouseY > fieldMaxY) {
    top = fieldMaxY;
  }

  if (mouseY >= halfHeight && mouseY <= fieldMaxY) {
    top = mouseY;
  }

  ball.style.left = left + 'px';
  ball.style.top = top + 'px';
}
