var button = document.querySelector(".btn-toggle");
button.onclick = function () {
  var input = document.querySelector(".email").value;
  var parts = input.split("@");
  var str = "";

  for (part in parts[0]) {
    str += part.replace(part, "*");
  }
  parts = str.concat("@", parts[1]);
  document.querySelector(".email").value = parts;
};
