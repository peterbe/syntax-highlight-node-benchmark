var allowDrinksCheckbox = document.getElementById("allow-drinks");
var drinkSelect = document.getElementById("drink-select");

allowDrinksCheckbox.addEventListener("change", function(event) {
  if (event.target.checked) {
    drinkSelect.disabled = false;
  } else {
    drinkSelect.disabled = true;
  }
}, false);