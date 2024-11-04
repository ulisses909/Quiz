"use strict";

document.querySelector(".startbtn").addEventListener("mousedown", startDown);

function startDown() {
  this.style.backgroundColor = "#ddd";
  document.addEventListener("mouseup", startUp);
}

function startUp() {
  document.removeEventListener("mouseup", startUp);

  document.querySelector(".start").style.display = "none";
  document.querySelector(".ligue").style.display = "block";
}

document
  .querySelectorAll(".nome")
  .forEach((nome) => nome.addEventListener("mousedown", mouseDown));

document.querySelector(".check").addEventListener("mousedown", check);

onScroll();
document.addEventListener("scroll", onScroll);

function onScroll(e) {
  document.querySelector(".check").style.top =
    window.innerHeight + window.scrollY - 100 + "px";
}

resize();
window.addEventListener("resize", resize);

function resize() {
  onScroll();

  let screenSize = Math.max(window.innerWidth, 1440);
  document.querySelector(".html").style.width = screenSize + "px";

  document.querySelector(".check").style.left =
    Math.trunc(screenSize * 0.4) + "px";
  document.querySelector(".check").style.width =
    Math.trunc(screenSize * 0.2) + "px";
}

let moveObject = null;

function mouseDown(e) {
  e.preventDefault();
  this.style.zIndex = 10;
  moveObject = this;
  document.addEventListener("mousemove", mouseMove);
  this.addEventListener("mouseup", mouseUp);
}

function mouseMove(e) {
  e.preventDefault();
  moveObject.style.position = "absolute";
  moveObject.style.left = e.clientX - 25 + window.scrollX + "px";
  moveObject.style.top = e.clientY - 10 + window.scrollY + "px";
}

function mouseUp(e) {
  this.style.zIndex = 5;
  document.removeEventListener("mousemove", mouseMove);
}

function check(e) {
  document.addEventListener("mouseup", checkUnclick);
  this.style.backgroundColor = "#ddd";
}

function checkUnclick(e) {
  document.removeEventListener("mouseup", checkUnclick);
  checar();
  document.querySelector(".check").style.backgroundColor = "white";
}

function getPosition(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2 + window.scrollX,
    y: rect.top + rect.height / 2 + window.scrollY,
  };
}

function checar() {
  const nomes = [
    ".strow",
    ".dapfap",
    ".gummi",
    ".dogos",
    ".haha",
    ".lara",
    ".gui",
    ".bilu",
    ".sink",
    ".kake",
  ];

  let ok = true;

  nomes.forEach((nome) => {
    let elements = document.querySelectorAll(nome);

    const posBox = getPosition(elements[0]);
    const posNome = getPosition(elements[1]);

    if (
      Math.abs(posBox.x - posNome.x) < 60 &&
      Math.abs(posBox.y - posNome.y) < 50
    ) {
      elements[0].style.backgroundColor = "#6f8";
      elements[1].style.backgroundColor = "#6f8";
    } else {
      ok = false;
      elements[0].style.backgroundColor = "#f66";
      elements[1].style.backgroundColor = "#f66";
    }
  });

  document.querySelector(".check").removeEventListener("mousedown", check);

  if (ok) {
    document.querySelector(".check").textContent = "Próxima";
    document.querySelector(".check").addEventListener("mousedown", proxima);
  } else {
    document.querySelector(".check").textContent = "Recomeçar";
    document.querySelector(".check").addEventListener("mousedown", refresh);
  }
}

function refresh(e) {
  document.addEventListener("mouseup", refreshUp);
}

function refreshUp(e) {
  location.reload();
}

function proxima(e) {
  document.addEventListener("mouseup", proximaUp);
  this.style.backgroundColor = "#ddd";
}

function proximaUp(e) {
  document.removeEventListener("mouseup", proximaUp);
  startQ2();
}

function startQ2() {
  document.querySelector(".ligue").style.display = "none";
  document.querySelector(".q2").style.display = "block";

  document.querySelector(".mapa").addEventListener("mousedown", selectLocation);
  document
    .querySelector(".marker")
    .addEventListener("mousedown", selectLocation);

  const posMapa = getPosition(document.querySelector(".mapa"));
  document.querySelector(".certo").style.left = posMapa.x - 235 + "px";
  document.querySelector(".certo").style.top = posMapa.y - 25 + "px";
}

function selectLocation(e) {
  e.preventDefault();
  document.querySelector(".marker").style.display = "block";
  document.querySelector(".marker").style.top =
    e.clientY + window.scrollY - 32 + "px";
  document.querySelector(".marker").style.left =
    e.clientX + window.scrollX - 8 + "px";
  document.querySelector(".confirm").addEventListener("mousedown", confirmDown);
  document.querySelector(".confirm").style.color = "#222";
}

function confirmDown(e) {
  document.addEventListener("mouseup", confirmUp);
  document.querySelector(".confirm").style.backgroundColor = "#ddd";
}

function confirmUp(e) {
  document.querySelector(".confirm").style.backgroundColor = "white";

  document.removeEventListener("mouseup", confirmUp);
  document
    .querySelector(".confirm")
    .removeEventListener("mousedown", confirmDown);

  checarLocal();
}

function checarLocal() {
  const marker = document.querySelector(".marker");

  const posBandeira = getPosition(marker);
  const posMapa = getPosition(document.querySelector(".mapa"));

  const errorX = posBandeira.x - posMapa.x + 202;
  const errorY = posBandeira.y - posMapa.y + 3;
  if (Math.abs(errorX) > 38 || Math.abs(errorY) > 30) {
    marker.textContent = "❌";

    let arrX = marker.style.left.split("");
    let arrY = marker.style.top.split("");

    arrX.pop();
    arrX.pop();
    arrY.pop();
    arrY.pop();

    let strX = arrX.join("");
    let strY = arrY.join("");

    marker.style.left = Number(strX) - 12 + "px";
    marker.style.top = Number(strY) + 8 + "px";
    marker.style.fontSize = "30px";

    document
      .querySelector(".mapa")
      .removeEventListener("mousedown", selectLocation);
    marker.removeEventListener("mousedown", selectLocation);

    document.querySelector(".resposta").style.display = "block";
    document.querySelector(".restart").style.display = "block";

    document
      .querySelector(".resposta")
      .addEventListener("mousedown", respostaDown);
    document
      .querySelector(".restart")
      .addEventListener("mousedown", restartDown);
  } else {
    startQ3();
    marker.textContent = "✅";

    let arrX = marker.style.left.split("");
    let arrY = marker.style.top.split("");

    arrX.pop();
    arrX.pop();
    arrY.pop();
    arrY.pop();

    let strX = arrX.join("");
    let strY = arrY.join("");

    marker.style.left = Number(strX) - 12 + "px";
    marker.style.top = Number(strY) + 8 + "px";
    marker.style.fontSize = "30px";

    document.querySelector(".confirm").textContent = "Próxima";
    document
      .querySelector(".confirm")
      .addEventListener("mousedown", proximaDown);
  }
}

function proximaDown(e) {
  document.querySelector(".confirm").style.backgroundColor = "#ddd";
  document.addEventListener("mouseup", proxima2Up);
}

function proxima2Up(e) {
  document.removeEventListener("mouseup", proxima2Up);
  startQ3();
}

function respostaDown(e) {
  document.addEventListener("mouseup", respostaUp);
  document.querySelector(".resposta").style.backgroundColor = "#ddd";
}

function respostaUp(e) {
  document.removeEventListener("mouseup", respostaUp);
  document.querySelector(".resposta").style.backgroundColor = "white";
  document.querySelector(".resposta").style.color = "grey";
  document.querySelector(".certo").style.display = "block";
  document
    .querySelector(".resposta")
    .removeEventListener("mousedown", respostaDown);
}

function restartDown(e) {
  document.addEventListener("mouseup", restartUp);
  document.querySelector(".restart").style.backgroundColor = "#ddd";
}

function restartUp(e) {
  location.reload();
}

function startQ3(e) {
  document.querySelector(".q2").style.display = "none";
  document.querySelector(".q3").style.display = "block";

  document.querySelector(".entrada").addEventListener("input", changeEntrada);
}

function changeEntrada(e) {
  if (Number(this.value) === NaN || this.value === "") {
    document.querySelector(".enternum").style.color = "grey";
    document
      .querySelector(".enternum")
      .removeEventListener("mousedown", numberDown);
    return;
  }

  document.querySelector(".enternum").style.color = "#222";
  document.querySelector(".enternum").addEventListener("mousedown", numberDown);
}

function numberDown(e) {
  document.querySelector(".enternum").style.backgroundColor = "#ddd";
  document.addEventListener("mouseup", numberUp);
}

function numberUp(e) {
  document.querySelector(".enternum").style.backgroundColor = "white";
  document.removeEventListener("mouseup", numberUp);

  document.querySelector(".entrada").style.pointerEvents = "none";

  if (Number(document.querySelector(".entrada").value) === 16) {
    document.querySelector(".entrada").style.backgroundColor = "#6f8";
    document.querySelector(".enternum").textContent = "Próxima";
    document
      .querySelector(".enternum")
      .addEventListener("mousedown", proximaDown3);
    startQ4();
  } else {
    document.querySelector(".entrada").style.backgroundColor = "#f66";
    document.querySelector(".enternum").textContent = "Recomeçar";
    document
      .querySelector(".enternum")
      .addEventListener("mousedown", restartDown3);
  }
}

function proximaDown3(e) {
  document.addEventListener("mouseup", proximaUp3);
  document.querySelector(".enternum").style.backgroundColor = "#ddd";
}

function proximaUp3(e) {
  document.removeEventListener("mouseup", proximaUp3);

  startQ4();
}

function restartDown3(e) {
  document.addEventListener("mouseup", restartUp3);
  document.querySelector(".enternum").style.backgroundColor = "#ddd";
}

function restartUp3(e) {
  location.reload();
}

function startQ4(e) {
  document.querySelector(".q3").style.display = "none";
  document.querySelector(".q4").style.display = "block";

  document
    .querySelectorAll(".fci")
    .forEach((element) => element.addEventListener("mousedown", wrongDown));
}


let wrongElement;
function wrongDown() {
  this.style.backgroundColor = "#ddd";
  document.addEventListener("mouseup", wrongUp);
  wrongElement = this;
}

function wrongUp() {
  document.removeEventListener("mouseup", wrongUp);

  if(wrongElement === document.querySelector(".qgui")) {
    startQ5();
  }

  wrongElement.style.backgroundColor = "#f66";

  document.querySelector(".restartfc").style.display = "block";
  document.querySelector(".restartfc").addEventListener("mousedown", restartfc);

  document
    .querySelectorAll(".fci")
    .forEach((element) => element.removeEventListener("mousedown", wrongDown));

  document.querySelector(".qgui").removeEventListener("mousedown", rightDown);
}

function restartfc() {
  document.addEventListener("mouseup", () => location.reload());
}

function startQ5() {
  document.querySelector(".q4").style.display = "none";
}