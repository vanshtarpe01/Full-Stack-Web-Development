// let h1 = document.querySelector("h1");
// console.log(h1);
// h1.innerText = "Hello Vansh";
// h1.innerHTML = "<i>Hello</i> Ram";

let abcd = document.getElementById("abcd");
console.dir(abcd);

let a = document.querySelector("a");
// a.href = "https://www.google.com";
a.innerText = "Dowmload Now";

a.removeAttribute("href");
// a.href = "https://www.google.com";
a.setAttribute("href", "https://www.google.com");
console.log(a.getAttribute("href"));


let h2 = document.createElement("h2");
h2.innerText = "Hello Jii...";

let body = document.querySelector("body");
// body.appendChild(h2);
body.prepend(h2);
console.log(h2);
h2.style.color = "blue";
h2.style.backgroundColor = "yellow";
// body.removeChild(h1);

h2.addEventListener("click", ()=>{
    h2.style.color = "red";
});

h2.addEventListener("dblclick", ()=>{
    h2.style.color = "black";
});

h2.removeEventListener("dblclick", ()=>{
    h2.style.color = "blue";
});

input221 = document.createElement("input");
input221.setAttribute("placeholder", "Enter Your Name");
console.dir(input221);
body.prepend(input221);
input221.addEventListener("input", (dets)=>{
      console.log(dets.data);
    // if(dets.data !== null){
    //     console.log(dets.data);
    // }
});

let cities = document.querySelector("select");
console.log(cities);
console.dir(cities);

let device_det = document.querySelector("#device-det");
cities.addEventListener("change", (dets)=>{
    device_det.innerText = "Device is Selected " + dets.target.value;
});