// Append a new element at the end of a container.
let h1 = document.createElement("h1");
h1.innerText = "Hello, Good Evening My Dears Friends..";
let container = document.querySelector(".container");
container.append(h1);

// Insert an element before an existing element.
let h3 = document.createElement("h3");
h3.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta vel itaque, repellendus earum animi corrupti mollitia molestias iusto ad eligendi a voluptatibus in nisi sequi explicabo nulla cupiditate repellat ipsam!";
container.insertBefore(h3, h1);

// Insert an element after a specific element.
let h4 = document.createElement("h4");
h4.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta vel itaque, repellendus earum animi corrupti mollitia molestias iusto ad eligendi a voluptatibus in nisi sequi explicabo nulla cupiditate repellat ipsam!";
container.after(h1, h4);

// Remove a paragraph from the DOM.
let p = document.querySelector("p");
p.remove();

// Change text using textContent.
let newh1 = document.querySelector("#h1new");
newh1.textContent= "I am Vansh and am here to guide you..";

// Change content using innerHTML.
h4.innerHTML = "<em>Lorem ipsum dolor sit amet consectetur adipisicing elit.</em> Soluta vel itaque, repellendus earum animi corrupti mollitia molestias iusto ad eligendi a voluptatibus in nisi sequi explicabo nulla cupiditate repellat ipsam!";

// Add a new attribute to an element.
let link = document.createElement("a");
link.setAttribute("href", "https://www.google.com");
link.innerText = "Click Me..";
container.prepend(link);

let img = document.querySelector("img");
img.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJDhjTJKCW-s0mgIZaZWiJsMx-Bs9d0mFiePZILDE6hoBVTlMlIXkjUS8&s");
img.removeAttribute("alt");

// Toggle a class on an element.
container.classList.toggle("container");

// Change placeholder text of an input.
// let inp = document.getElementsByTagName("input")[0];
let inp = document.querySelector("input");
inp.setAttribute("placeholder", "Enter Your Name Here..");

