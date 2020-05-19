let test = document.getElementById("test");

// Briefly make the list purple when the mouse moves off the
// <ul> element
test.addEventListener("mouseleave", function( event ) {   
  // highlight the mouseleave target
  event.target.style.color = "purple";

  // reset the color after a short delay
  setTimeout(function() {
    event.target.style.color = "";
  }, 1000);
}, false);

// Briefly make an <li> orange when the mouse moves off of it
test.addEventListener("mouseout", function( event ) {   
  // highlight the mouseout target
  event.target.style.color = "orange";

  // reset the color after a short delay
  setTimeout(function() {
    event.target.style.color = "";
  }, 500);
}, false);