var values = document.getElementById('values');
var display = document.getElementById('display');
var container = document.getElementById('container');

values.addEventListener('change', function (evt) {
  container.style.alignItems = evt.target.value;
});

display.addEventListener('change', function (evt) {
  container.className = evt.target.value;
});
