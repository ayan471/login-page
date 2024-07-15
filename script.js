document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const rememberMeCheckbox = document.getElementById("remember-me");
  const usernameError = document.getElementById("username-error");
  const passwordError = document.getElementById("password-error");
  const togglePassword = document.getElementById("toggle-password");
  const form = document.getElementById("login-form");

  const savedUsername = localStorage.getItem("username");
  if (savedUsername) {
    usernameInput.value = savedUsername;
    rememberMeCheckbox.checked = true;
  }

  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    if (type === "password") {
      togglePassword.classList.add("fa-eye-slash");
      togglePassword.classList.remove("fa-eye");
    } else {
      togglePassword.classList.remove("fa-eye-slash");
      togglePassword.classList.add("fa-eye");
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    let valid = true;

    if (!validateUsername(username)) {
      usernameError.style.display = "block";
      valid = false;
    } else {
      usernameError.style.display = "none";
    }

    if (!validatePassword(password)) {
      passwordError.style.display = "block";
      valid = false;
    } else {
      passwordError.style.display = "none";
    }

    if (valid) {
      if (rememberMeCheckbox.checked) {
        localStorage.setItem("username", username);
      } else {
        localStorage.removeItem("username");
      }

      const loginButton = document.getElementById("login-btn");
      loginButton.textContent = "Login Success";
      loginButton.style.backgroundColor = "#4CAF50";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    }
  });

  function validateUsername(username) {
    return username.length >= 6;
  }

  function validatePassword(password) {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasDigit &&
      hasSpecialChar
    );
  }
});
