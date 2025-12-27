// Keyboard Events

// Log pressed key in the console.
let display = document.createElement("p");
document.addEventListener("keypress", (e) =>{
    console.log(e.key);
    display.innerText += e.key + "\n";
});
document.body.append(display);

// Last Pressed Key
// let display = document.createElement("p");
// document.body.append(display);

// document.addEventListener("keydown", (e) => {
//     console.log(e.key);
//     display.textContent = `Last key pressed: ${e.key}`;
// });

// Display key code of pressed key.
document.addEventListener("keypress", (e)=>{
    console.log(e.keyCode);
});

// Change text color when Enter key is pressed.
document.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        display.style.color = "orange";
    }
});

// Prevent typing numbers in an input field.
const input = document.getElementById("myInput");

input.addEventListener("keydown", (e) => {
    // Check if the pressed key is a number
    if (e.key >= "0" && e.key <= "9") {
        e.preventDefault(); // stop the key from being entered
    }

});

// Detect when Shift key is pressed.
document.addEventListener("keydown", (e)=>{
    if(e.key === "Shift"){
        console.log("Shift key is pressed..");
    }
});

// Convert input text to uppercase while typing.
let inp = document.querySelector("#name");
inp.addEventListener("input", ()=>{
    let inp1 = inp.value.toUpperCase();
    console.log(inp1);
});

// Clear input field when Escape key is pressed.
document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape");
    {
        inp.value = "";
    }
});