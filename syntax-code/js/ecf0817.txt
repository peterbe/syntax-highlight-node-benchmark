function updateTransition() {
  var el = document.querySelector("div.box");
   
  if (el) {
    el.className = "box1";
  } else {
    el = document.querySelector("div.box1");
    el.className = "box";
  }
   
  return el;
}

var intervalID = window.setInterval(updateTransition, 7000);
