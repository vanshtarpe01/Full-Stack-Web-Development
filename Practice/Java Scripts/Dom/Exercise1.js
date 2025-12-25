// Select an element by ID and change its text.
let greet = document.getElementById("greet");
greet.innerText = "Hello Mr. Vansh";

// Select all elements with a class name and log them.
let paras = document.getElementsByTagName("p");
console.log(paras);

for(let value of paras){
    console.log(value);  //For of most commonly used with Arrays
}

// Select the first <p> tag and change its color.
let para1 = document.querySelector(".para");
console.log(para1);
para1.style.color = "blue";

// Select all <li> elements and count how many are present.
let lis = document.getElementsByTagName("li");
console.log(lis);
for(let val of lis){
    console.log(val);
}
console.log(lis.length);

//Select an element using querySelector with a class.
let paras1 = document.querySelectorAll(".para");
console.log(paras1);

// Select all buttons using querySelectorAll.
let btn = document.querySelectorAll("button");
console.log(btn);
// Select the last element from a NodeList.
console.log(btn[btn.length-1]);

// Select all <input> elements and log their values.
let inputs = document.getElementsByTagName("input");

// Loop through each input and log its value
for (let input of inputs) {
    console.log(input.value);
}

// Select an element using an attribute selector.
let inputEmail = document.querySelector('input[type="email"]'); 
console.log(inputEmail.value);

// Check if an element exists before modifying it.
let heading = document.querySelector("#heading");

if (heading) {
    heading.textContent = "Updated Heading";
} else {
    console.log("Heading element not found!");
}