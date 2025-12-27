//Basic Event

// Change text of a paragraph when a button is clicked.
let para1 = document.querySelector("p");
let btn = document.querySelector("button");
btn.addEventListener("click", () => {
    para1.innerText = "I am Pyara Paragraph";
    para1.style.color = "teal";
    // Show an alert message on button click.
    alert("The Text of paragraph will be change..");

    // Display current time when a button is clicked.
    let h5 = document.querySelector("h5");
    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString();
    h5.innerText = formattedDateTime;

    // Change image source on button click.
    let img = document.querySelector("img");
    img.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRayC7OD5gVbNADA2ZBAa5UtlZcd9OiNR4k6Du5pqIvyox1a4mJwdn_7Ys&s");

    let para2 = document.querySelector("#para");
    para2.style.display = "none";
});

// Change background color of a div on click.
let div = document.querySelector("div");
div.addEventListener("click", () => {
    div.style.backgroundColor = "aquamarine";
});

// Log a message when the page finishes loading
window.onload = function () {
    console.log("Page has fully loaded!");
}

// or
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is ready!");
});


let count = 0; // initial counter value
let btnIncrease = document.getElementById("btn-increase");
let counterDisplay = document.getElementById("counter");

btnIncrease.addEventListener("click", function() {
  count++; // increase counter
  counterDisplay.innerText = count; // update display
});

let btnDecrease = document.querySelector("#btn-decrease");
btnDecrease.addEventListener("click", () =>{
    count--;
    counterDisplay.innerText = count;
});

let btnToggle = document.querySelector("#toggleBtn");
btnToggle.addEventListener("click", function() {
  btnToggle.innerText = (btnToggle.innerText === "OFF") ? "ON" : "OFF";
});
