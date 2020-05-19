const buttonElement = document.getElementById('btn');

// Add a handler for the 'click' event by providing a callback function.
// Whenever the element is clicked, a pop-up with "Element clicked!" will
// appear.
buttonElement.addEventListener('click', function (event) {
  alert('Element clicked through function!');
});

// For compatibility, a non-function object with a `handleEvent` property is
// treated just the same as a function itself.
buttonElement.addEventListener('click', {
  handleEvent: function (event) {
    alert('Element clicked through handleEvent property!');
  }
});
