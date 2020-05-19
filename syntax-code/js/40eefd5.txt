var myWorker = new Worker('/worker.js');
var first = document.querySelector('input#number1');
var second = document.querySelector('input#number2');

first.onchange = function() {
  myWorker.postMessage([first.value, second.value]);
  console.log('Message posted to worker');
}