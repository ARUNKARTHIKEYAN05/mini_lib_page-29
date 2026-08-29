document.getElementById("registerForm").addEventListener("submit", function(event) {

    // Form submit aagama stop pannum
    event.preventDefault();

    // Input values eduthukkrom
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;

    let message = document.getElementById("message");

    // Password check
    if (password.length < 6) {
        message.textContent = "Password minimum 6 characters irukkanum!";
        message.style.color = "red";
        return;
    }

    // Phone number check
    if (phone.length < 10) {
        message.textContent = "Valid phone number enter pannunga!";
        message.style.color = "red";
        return;
    }

    // Registration successful
    message.textContent = "Registration successful! 🎉";
    message.style.color = "green";

    // Data browser-la save pannrom
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("password", password);

    // 1 second apram login page-ku pogum
    setTimeout(function() {
        window.location.href = "../loginpage/login.html";
    }, 1000);

});