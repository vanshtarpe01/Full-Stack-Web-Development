//Selects the HTML elements using js and type of selection
// Type 1.
const para = document.querySelector("p"); // It Selects the only first tag of <p> (First Occurence)

// Type 2.
const paras = document.querySelectorAll("p"); // It Selects all the paragraphs in nodelist format
// You can also selects using the id and classname 
// const usingId = document.querySelectorAll("#ordered-list");
const usingClassName = document.querySelectorAll(".list-items");

// Type 3.
const ol = document.getElementById("ordered-list"); // It Selects the element that matching provided id

// Type 4.
const li = document.getElementsByClassName("list-items"); // It Selects all the elements with the class name list-items

// Type 5.
const divs = document.getElementsByTagName("div"); // Selects the element by using tagname

// Type 6.
const usingName = document.getElementsByName("username"); // Selects elements by their name attribute (commonly used in forms).
