window.addEventListener("load", load);

document.querySelectorAll(".input-valor-cor").forEach(function (element) {
  element.addEventListener("change", alterarCor);
});

function load(e) {
  document.querySelector("input").focus();
}

function alterarCor(event) {
  var r = document.querySelector("#inpVermelho").value;
  var g = document.querySelector("#inpVerde").value;
  var b = document.querySelector("#inpAzul").value;

  document.querySelector("#resultado").style.backgroundColor =
    "rgb(" + r + "," + g + "," + b + ")";

  document.querySelector("#inpVermelhoValor").value = r;
  document.querySelector("#inpVerdeValor").value = g;
  document.querySelector("#inpAzulValor").value = b;
}

function setarValor(valor) {}

function setarCores(r, g, b) {
  document.querySelector("#resultado").style.backgroundColor =
    "rgb(" + r + "," + g + "," + b + ")";
}
