function isUpperCase(str) {
  return str.charCodeAt(0) >= 65 && str.charCodeAt(0) <= 90;
}

var button = document.querySelector(".btn-change");
button.onclick = function () {
  var input = document.querySelector(".input").value;
  var toggleCase = input
    .split("")
    .map((str) => (isUpperCase(str) ? str.toLowerCase() : str.toUpperCase()))
    .join("");
  document.querySelector(".input").value = toggleCase;
};
