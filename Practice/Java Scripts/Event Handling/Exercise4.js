// Form Events

// Show input value on button click.
let yourName = document.querySelector("#yourName");
let btn = document.querySelector("button");
btn.addEventListener("click", ()=>{
    console.log(yourName.value);
});

// Validate input field on submit.
let userName = document.querySelector("#username");
let form = document.querySelector("form");
let btnSubmit = document.querySelector("#btn-submit");
form.addEventListener("submit", ()=>{
    if(userName.value.trim() === ""){
        alert("Please Enter Username");
    }else if(userName.value.trim().length < 3){
        alert("Please Enter Username greater than 3 letters");
    }else {
        alert("Form submitted successfully!");
    }
});

// Prevent form submission if input is empty.
btnSubmit.addEventListener("click", (e)=>{
    e.preventDefault();
});