let button = document.querySelector('button');
let html = document.querySelector('html');

function random(number) {
  return Math.floor(Math.random() * number);
}

function randomColor() {
    return `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
}

button.onclick = function() {
  button.style.backgroundColor = randomColor();
};

button.onauxclick = function(e) {
  e.preventDefault();
  button.style.color = randomColor();
}

button.oncontextmenu = function(e) {
  e.preventDefault();
}
