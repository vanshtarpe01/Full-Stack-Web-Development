// Mouse Events

// Change color when mouse enters a div.
let container = document.querySelector("div");
container.addEventListener("mouseenter", () =>{
    container.style.backgroundColor = "blue";
});

// Reset color when mouse leaves the div.
container.addEventListener("mouseleave", ()=>{
    container.style.backgroundColor = "yellow";
});

// Display coordinates of mouse on mouse move.
container.addEventListener("mousemove", (e)=>{
    console.log(e);
    console.log(`X:- ${e.clientX}, Y:- ${e.clientY}`);
});

// Enlarge a box on mouse over.

container.addEventListener("mouseenter", () => {
  container.style.width = "350px";
  container.style.height = "350px";
});

container.addEventListener("mouseleave", () => {
  container.style.width = "150px";
  container.style.height = "150px";
});

// Log a message on right-click.
container.addEventListener("contextmenu", (event) => {
    event.preventDefault(); // stops the default right-click menu
    console.log("Right Clicked on the box");
});

// Change cursor style on hover.
container.addEventListener("mouseover", ()=>{
    container.style.cursor = "pointer";
});

// Track number of times mouse enters a div.
let count =0;
container.addEventListener("mouseenter", ()=>{
    count++;
    console.log(`Mouse Entered..${count}nth time`);
});