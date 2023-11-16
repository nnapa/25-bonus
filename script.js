document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("signupModal");
  var btns = document.querySelectorAll("button:not(#createAccountButton)");
  var span = document.getElementsByClassName("close")[0];
  var termsCheckbox = document.getElementById("termsCheckbox");
  var createAccountButton = document.getElementById("createAccountButton");
  var referralTrigger = document.querySelector(".referral-code-trigger");
  var referralInput = document.querySelector(".referral-code-input");
  var loginLink = document.querySelector(".login-link-button");
  var signupFormContainer = document.querySelector(".signup-form-container");
  var loginFormContainer = document.querySelector(".login-form-container");
  var forgetPasswordLink = document.querySelector(".forget-password-link");
  var backToLoginLink = document.querySelector(".back-to-login-link");
  var loginContainer = document.querySelector(".login-form-container");
  var resetPasswordContainer = document.querySelector(".reset-password-container");

  fetch("https://api.trustdice.win/dice/landing_page/")
    .then((response) => response.json())
    .then((data) => {
      const playerCount = data.users;
      document.querySelector(".player-count").textContent = playerCount;
    })
    .catch((error) => console.error("Error fetching player count:", error));

  function displayError(errorElementId, message) {
    var errorElement = document.getElementById(errorElementId);
    if (errorElement) {
      errorElement.innerText = message;
      errorElement.style.display = message ? "block" : "none";
    }
  }

  function resetFormInputs() {
    document.querySelectorAll('.modal input[type="username"], .modal input[type="email"], .modal input[type="password"]').forEach((input) => {
      input.value = "";
    });
    document.querySelectorAll(".modal .error-message").forEach((error) => {
      error.style.display = "none";
    });
  }

  function validateField(inputElement, errorElementId, validationFunction, errorMessage) {
    const isValid = validationFunction(inputElement.value);
    const message = isValid ? "" : errorMessage;
    displayError(errorElementId, message);
  }

  function updateCreateAccountButtonState() {
    createAccountButton.disabled = !termsCheckbox.checked;
  }

  function resetModalContents() {
    document.querySelectorAll(".error-message").forEach(function (elem) {
      elem.style.display = "none";
    });
    document.querySelectorAll('input[type="username"], input[type="email"], input[type="password"]').forEach(function (input) {
      input.value = "";
    });

    termsCheckbox.checked = false;
    offersCheckbox.checked = true;
    updateCreateAccountButtonState();
    signupFormContainer.style.display = "flex";
    loginFormContainer.style.display = "none";
    resetPasswordContainer.style.display = "none";
  }

  function closeModal() {
    modal.classList.remove("visible");
    document.body.style.overflow = "";
  }

  span.addEventListener("mousedown", function () {
    this.classList.add("close-clicked");
  });

  span.addEventListener("mouseup", function () {
    this.classList.remove("close-clicked");
  });

  span.addEventListener("mouseleave", function () {
    this.classList.remove("close-clicked");
  });

  btns.forEach(function (button) {
    button.addEventListener("click", function () {
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
      setTimeout(() => modal.classList.add("visible"), 10);
    });
  });

  span.addEventListener("click", closeModal);
  window.addEventListener("click", function (event) {
    if (event.target === modal) closeModal();
  });

  termsCheckbox.addEventListener("change", updateCreateAccountButtonState);

  modal.addEventListener("transitionend", function (event) {
    if (event.propertyName === "opacity" && !modal.classList.contains("visible")) {
      modal.style.display = "none";
      resetModalContents();
    }
  });

  referralTrigger.addEventListener("click", function () {
    this.parentNode.classList.toggle("active");
    referralInput.style.display = referralInput.style.display === "block" ? "none" : "block";
  });

  loginLink.addEventListener("click", function (event) {
    event.preventDefault();
    signupFormContainer.style.display = "none";
    loginFormContainer.style.display = "flex";
  });

  forgetPasswordLink.addEventListener("click", function (event) {
    event.preventDefault();
    loginContainer.style.display = "none";
    resetPasswordContainer.style.display = "flex";
  });

  backToLoginLink.addEventListener("click", function (event) {
    event.preventDefault();
    resetPasswordContainer.style.display = "none";
    loginContainer.style.display = "flex";
  });

  document.querySelector(".create-account-link").addEventListener("click", function (event) {
    event.preventDefault();
    loginFormContainer.style.display = "none";
    signupFormContainer.style.display = "flex";
  });

  // valid check functions
  function isValidUsername(username) {
    return username && username.length >= 3 && username.length <= 11 && /^[a-zA-Z0-9]+$/.test(username);
  }

  function isValidEmail(email) {
    return email && /\S+@\S+\.\S+/.test(email);
  }

  function isValidPassword(password) {
    return password && password.length >= 6;
  }

  // blur listeners
  function addBlurListener(inputElement, errorElementId, isValidFunction, errorMessage) {
    inputElement.addEventListener("blur", function () {
      validateField(inputElement, errorElementId, isValidFunction, errorMessage);
    });
  }

  addBlurListener(document.getElementById("usernameInput"), "usernameError", isValidUsername, "Username must be 3-11 characters long, and contains only letters and numbers.");
  addBlurListener(document.getElementById("emailInput"), "emailError", isValidEmail, "Please enter a valid email address.");
  addBlurListener(document.getElementById("passwordInput"), "passwordError", isValidPassword, "Please make it at least 6 characters.");
  addBlurListener(document.getElementById("loginUsernameEmail"), "loginUsernameError", isValidEmail, "Username must be 3-11 characters long, and contains only letters and numbers.");
  addBlurListener(document.getElementById("loginPassword"), "loginPasswordError", isValidPassword, "Please make it at least 6 characters.");
  addBlurListener(document.getElementById("resetEmailInput"), "resetEmailError", isValidEmail, "Please enter a valid email address.");

  createAccountButton.addEventListener("click", function (event) {
    event.preventDefault();
    validateField(document.getElementById("usernameInput"), "usernameError", isValidUsername, "Username must be 3-11 characters long, and contains only letters and numbers.");
    validateField(document.getElementById("emailInput"), "emailError", isValidEmail, "Please enter a valid email address.");
    validateField(document.getElementById("passwordInput"), "passwordError", isValidPassword, "Please make it at least 6 characters.");
  });

  document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    validateField(document.getElementById("loginUsernameEmail"), "loginUsernameError", isValidUsername, "Username must be 3-11 characters long, and contains only letters and numbers.");
    validateField(document.getElementById("loginPassword"), "loginPasswordError", isValidPassword, "Please make it at least 6 characters.");
  });

  loginButton.addEventListener("click", function (event) {
    event.preventDefault();
    validateField(document.getElementById("loginUsernameEmail"), "loginUsernameError", isValidUsername, "Username must be 3-11 characters long, and contains only letters and numbers.");
    validateField(document.getElementById("loginPassword"), "loginPasswordError", isValidPassword, "Please make it at least 6 characters.");
  });

  document.getElementById("resetPasswordForm").addEventListener("submit", function (event) {
    event.preventDefault();
    validateField(document.getElementById("resetEmailInput"), "resetEmailError", isValidEmail, "Please enter a valid email address.");
  });

  resetButton.addEventListener("click", function (event) {
    event.preventDefault();
    validateField(document.getElementById("resetEmailInput"), "resetEmailError", isValidEmail, "Please enter a valid email address.");
  });

  // rainbow divider position
  function positionDividers() {
    var steps = document.querySelectorAll(".step");
    steps.forEach(function (step) {
      var h3 = step.querySelector("h3");
      var p = step.querySelector("p");
      var divider = step.querySelector(".divider");
      if (h3 && p && divider) {
        var h3Bottom = h3.offsetTop + h3.offsetHeight;
        var pTop = p.offsetTop;
        var closerToH3 = h3Bottom + (pTop - h3Bottom) * 0.2;
        divider.style.top = closerToH3 + "px";
      }
    });
  }
  positionDividers();
  window.onresize = positionDividers;

  // password visible toggle
  document.querySelectorAll(".password-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function () {
      console.log("Toggle clicked");
      let passwordContainer = this.parentElement;
      let passwordInput = passwordContainer.querySelector("input[type='password'], input[type='text']");
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        this.src = "https://trustdice.win/public/ac35fe2ef33ccd824c284ca2b79ef4fc.svg"; // hide toggle icon
      } else {
        passwordInput.type = "password";
        this.src = "https://trustdice.win/public/0ca2aba62e7c01da1ffd2bf2c26d4549.svg"; // show toggle icon
      }
    });
  });
});
