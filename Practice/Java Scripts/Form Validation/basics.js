let userName = document.querySelector("#user-name");
let password = document.querySelector("#password");
let btnSubmit = document.querySelector("#submit");
let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop the form from refreshing the page

    let userValue = userName.value.trim();
    let passValue = password.value.trim();

    // Simple validation
    if (userValue === "") {
        alert("Username is required!");
        return;
    }
    if (passValue.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
    }

    console.log("Username:", userValue);
    console.log("Password:", passValue);
});


