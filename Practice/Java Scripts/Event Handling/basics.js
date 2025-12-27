let p = document.querySelector("p");
p.addEventListener("click", ()=>{
    p.style.color = "blue";
});

let btn = document.querySelector("button");
let h2 = document.querySelector("h2");
btn.addEventListener("click", () =>{
    h2.innerText = "Button Was Clciked";
});