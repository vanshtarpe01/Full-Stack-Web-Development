var btn = document.querySelector("button");
var box = document.querySelector("#box");

btn.addEventListener("click", ()=>{
    var c1 = Math.floor(Math.random()*256);
    var c2 = Math.floor(Math.random()*256);
    var c3 = Math.floor(Math.random()*256);

    box.style.backgroundColor = `rgb(${c1}, ${c2}, ${c3})`;
});

setInterval(()=>{
    let c1 = Math.floor(Math.random()*256);
    let c2 = Math.floor(Math.random()*256);
    let c3 = Math.floor(Math.random()*256);
    let a = Math.random().toFixed(2); // alpha between 0.00 and 1.00
    btn.style.backgroundColor = `rgba(${c1}, ${c2}, ${c3}, ${a})`;
}, 3000);