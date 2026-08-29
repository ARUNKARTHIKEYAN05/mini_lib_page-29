const loginform = document.getElementById("loginform");

loginform.addEventListener("submit", function(event) {

    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    // Empty field check
    if (username === "" || password === "") {

        alert("Please enter username and password");
        return;
    }


    // Registered user data get from localStorage
    const registeredUsername = localStorage.getItem("username");
    const registeredPassword = localStorage.getItem("password");


    // Check registered user
    if (username === registeredUsername && password === registeredPassword) {

        alert("Login successful!");

        // Go to home page
        window.location.href = "../homepage/home.html";

    }

    else {

        alert("Invalid username or password");

    }

});