let paragraph = document.getElementById("para");
let output = document.getElementById("output");

if (paragraph.matches(":scope")) {
  output.innerText = "Yep, the element is its own scope as expected!";
}