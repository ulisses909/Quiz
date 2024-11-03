"use strict";



document
  .querySelectorAll(".nome")
  .forEach((nome) => nome.addEventListener("mousedown", mouseDown));

function mouseDown(e) {
  e.preventDefault();
  this.addEventListener("mousemove", mouseMove);
  this.addEventListener("mouseup", mouseUp);
}

function mouseMove(e) {
  e.preventDefault();
  this.style.left = e.clientX - 25 + "px";
  this.style.top = e.clientY - 5 + "px";
}

function mouseUp(e) {
  this.removeEventListener("mousemove", mouseMove);
}
