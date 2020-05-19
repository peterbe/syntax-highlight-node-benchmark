document.getElementById('fullscreen-div').addEventListener('fullscreenchange', (event) => {
  // document.fullscreenElement will point to the element that
  // is in fullscreen mode if there is one. If not, the value
  // of the property is null.
  if (document.fullscreenElement) {
    console.log(`Element: ${document.fullscreenElement.id} entered fullscreen mode.`);
  } else {
    console.log('Leaving full-screen mode.');
  }
});

document.getElementById('toggle-fullscreen').addEventListener('click', (event) => {
  if (document.fullscreenElement) {
    // exitFullscreen is only available on the Document object.
    document.exitFullscreen();
  } else {
    document.getElementById('fullscreen-div').requestFullscreen();
  }
});