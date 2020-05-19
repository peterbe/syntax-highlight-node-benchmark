const button = document.querySelector('button');

button.addEventListener('click', event => {
  button.innerHTML = `Click count: ${event.detail}`;
});