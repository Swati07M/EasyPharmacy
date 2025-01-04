// Ensure elements exist before accessing them to avoid errors
document.addEventListener("DOMContentLoaded", () => {
    const loginText = document.querySelector(".title-text .login");
    const signupText = document.querySelector(".title-text .signup");
    const loginForm = document.querySelector("form.login");
    const loginBtn = document.querySelector("label.login");
    const signupBtn = document.querySelector("label.signup");
    const signupLink = document.querySelector("form .signup-link a");

    let login_details = JSON.parse(localStorage.getItem("signup_details")) || [];

    // Show "Sign-In" and hide "Create Account"
    loginBtn.onclick = () => {
        loginForm.style.marginLeft = "0%";
        loginText.style.display = "block";
        signupText.style.display = "none";
    };

    // Show "Create Account" and hide "Sign-In"
    signupBtn.onclick = () => {
        loginForm.style.marginLeft = "-50%";
        loginText.style.display = "none";
        signupText.style.display = "block";
    };

    // Simulate the signup button click when clicking the "Signup now" link
    signupLink.onclick = (event) => {
        event.preventDefault();
        signupBtn.click();
    };

    // Initial state for text visibility
    signupText.style.display = "none";
    loginText.style.display = "block";

    let signupButton = document.querySelector("#signup-submit");
    signupButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission behavior

        let signup_name = document.querySelector("#signup-name").value.trim();
        let signup_email = document.querySelector("#signup-email").value.trim();
        let signup_pass = document.querySelector("#signup-password").value.trim();
        let check = login_details.find((ele) => ele.signup_email === signup_email);

        if (!check) {

            if (signup_name && signup_email && signup_pass) {
                let obj = {
                    signup_name,
                    signup_email,
                    signup_pass,
                };

                login_details.push(obj);
                localStorage.setItem("signup_details", JSON.stringify(login_details));
                alert("Signup Successful");
                window.location.reload(); // Refresh the page after successful signup
            } else {
                alert("Please fill in all fields");
            }
        }
        else {
            alert("Email already exist")
        }
    });

    let loginButton = document.querySelector("#login-submit");
    loginButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission behavior

        let login_email = document.querySelector("#login-email").value.trim();
        let login_pass = document.querySelector("#login-password").value.trim();

        // Use `find()` to check for matching user
        let user = login_details.find((elem) => elem.signup_email === login_email && elem.signup_pass === login_pass);

        if (user) {
            // Generate a unique user ID (using current timestamp and random number)
            const userId = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

            // Save the user ID in localStorage for future reference
            localStorage.setItem("currentUserId", userId);
            localStorage.setItem("currentUserEmail", user.signup_email);
            localStorage.setItem("currUserName", user.signup_name);

            alert("Login Successful");
            window.location.href = "./productDetails.html"; // Redirect if login is successful
        } else {
            alert("Incorrect Credentials");
        }
    });
});