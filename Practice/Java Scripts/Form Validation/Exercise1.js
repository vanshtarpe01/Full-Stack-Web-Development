// Show input value on button click.
let btnSubmit = document.querySelector("#btn-submit");
let userName = document.querySelector("#user-name");
let password = document.querySelector("#password");
let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
});

// Change input border color on focus.
password.addEventListener("focus", () => {
    password.style.border = "2px solid red"; // change border color on focus
    console.log("Focus on password")
});

password.addEventListener("blur", () => {
    password.style.border = "1px solid #ccc"; // reset border when focus is lost
});

let strengthMessage = document.querySelector("#strength-message");

password.addEventListener("input", () => {
    let value = password.value;
    let message = "";
    let strength = 0;

    // Basic rules
    if (value.length >= 6) strength++; // length rule
    if (/[A-Z]/.test(value)) strength++; // uppercase rule
    if (/[0-9]/.test(value)) strength++; // number rule
    if (/[^A-Za-z0-9]/.test(value)) strength++; // special char rule

    // Decide message
    switch (strength) {
        case 0:
        case 1:
            message = "Weak password ❌";
            strengthMessage.style.color = "red";
            break;
        case 2:
            message = "Medium strength ⚠️";
            strengthMessage.style.color = "orange";
            break;
        case 3:
            message = "Strong password ✅";
            strengthMessage.style.color = "green";
            break;
        case 4:
            message = "Very strong password 💪";
            strengthMessage.style.color = "darkgreen";
            break;
    }

    strengthMessage.textContent = message;
});

// Show selected option from dropdown.
let selectCity = document.querySelector("#select-city");
let selectedCity = document.querySelector("#selected-city");

btnSubmit.addEventListener("click", () => {
    if (userName.value.trim() === "") {
        alert("Enter username..");
    } else if (userName.value.trim().length >= 3) {
        console.log(userName.value);
    } else {
        alert("Username must be greater than 3 char");
    }

    console.log(selectCity.value);
    selectedCity.innerText = `${selectCity.value} City Selected`;

    // Select all checked checkboxes
    let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Count them
    let count = checkedBoxes.length;

    console.log("Checked count:", count);

    if (count === 0) {
        alert("Please select at least one skill!");
    } else {
        alert("You selected " + count + " skills.");
    }
});

let checkbox = document.querySelector("#fill-username");
let usernameInput = document.querySelector("#username1");

checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        usernameInput.value = "Vansh123"; // auto-fill when checked
    } else {
        usernameInput.value = ""; // clear when unchecked
    }
});

