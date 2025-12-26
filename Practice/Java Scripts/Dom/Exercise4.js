// Change text color of a paragraph.
let p = document.querySelector("p");
p.style.color = "blue";

// Change background color of a div.
let box = document.querySelector(".box");
box.style.background = "teal";

// Hide an element using CSS.
box.style.display = "none";
// box.style.visibility = "hidden";

// Show a hidden element.
box.style.display = "block";

// Change font size dynamically.
p.style.fontSize = "25px";

// Add inline styles using JavaScript.
box.style.backgroundColor = "lightblue";
box.style.padding = "20px";
box.style.border = "2px solid black";
box.style.borderRadius = "8px";
box.style.color = "darkblue";
box.style.fontSize = "18px";

// Change border style of an element.
box.style.borderStyle = "dashed";

// Apply multiple style changes at once.
let box1 = document.querySelector(".box1");

Object.assign(box1.style, {
  backgroundColor: "lightblue",
  padding: "20px",
  border: "2px solid black",
  borderRadius: "8px",
  color: "darkblue",
  fontSize: "18px"
});

// Remove inline styles.
box.style.removeProperty("background-color");

// Add a CSS class to style an element
let box2 = document.querySelector(".box2");
box2.classList.add("box2");
