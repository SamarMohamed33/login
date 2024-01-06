// get the user's info from the form fields
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let nameInput = document.getElementById("name");

let signInBtn = document.getElementById("signinBtn");
let signUpBtn = document.getElementById("signupBtn");
let signinMessage = document.getElementById("signin-msg");
let signupMessgae = document.getElementById("signup-msg");

// validations test
let emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
let nameValidation = /[a-zA-Z]{3,}/;
let users = [];

// Error Messages
let nameErrorMessage = document.getElementById("nameErrorMsg");
let emailErrorMessage = document.getElementById("emailErrorMsg");
let passwordErrorMessage = document.getElementById("passwordErrorMsg");

if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
}

var found = false;
var loggedIn = false;
var userName = "";
function signUp() {
  if (
    inputValidation(nameInput, nameErrorMessage, nameValidation) &&
    inputValidation(emailInput, emailErrorMessage, emailValidation) &&
    inputValidation(passwordInput, passwordErrorMessage, passwordValidation)
  ) {
    var checkRepeatedUser = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === emailInput.value) {
        checkRepeatedUser = true;
      }
    }
    if (checkRepeatedUser) {
      showError(signupMessgae, "The Email already exists", "text-danger");
      emailInput.classList.remove("is-valid");
      emailInput.classList.add("is-invalid");
    } else {
      emailInput.classList.remove("is-invalid");
      emailInput.classList.add("is-valid");
      let newUser = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      showError(
        signupMessgae,
        "Your account has been created successfully",
        "text-success"
      );
      clearFields();
    }
  } else {
    inputValidation(nameInput, nameErrorMessage, nameValidation);
    inputValidation(emailInput, emailErrorMessage, emailValidation);
    inputValidation(passwordInput, passwordErrorMessage, passwordValidation);
  }
}

function signIn() {
  if (
    emailValidation.test(emailInput.value) &&
    passwordValidation.test(passwordInput.value)
  ) {
    for (let i = 0; i < users.length; i++) {
      if (
        emailInput.value.toLowerCase() == users[i].email.toLowerCase() &&
        passwordInput.value == users[i].password
      ) {
        found = true;
        localStorage.setItem("loggedInUser", JSON.stringify(users[i].name));
      }
    }
    if (found && localStorage.getItem("loggedInUser") !== null) {
      window.location.href = "welcome.html";
    } else {
      showError(
        signinMessage,
        " The email or password is wrong.",
        "text-danger"
      );
    }
  } else {
    showError(signinMessage, " The email or password is wrong.", "text-danger");
  }
}

function showError(messageBox, msg, color) {
  messageBox.style.cssText = `
    display: block !important;
    `;
  messageBox.classList.add(color);
  messageBox.innerHTML = msg;
}

function clearFields() {
  emailInput.value = "";
  passwordInput.value = "";
  nameInput.value = "";
  nameInput.classList.remove("is-valid");
  emailInput.classList.remove("is-valid");
  passwordInput.classList.remove("is-valid");
}

window.addEventListener("load", function () {
  // console.log(window.location.href);
  // console.log(loggedIn);
  if (window.location.href == "welcome.html") {
    if (this.localStorage.getItem("loggedInUser") == null) return;
  }
});

function inputValidation(inputElement, inputMessageElement, inputTest) {
  if (inputElement.value == "") {
    inputMessageElement.classList.replace("d-none", "d-block");
    inputElement.classList.remove("is-valid");
    inputElement.classList.add("is-invalid");
    return false;
  } else {
    if (inputTest.test(inputElement.value)) {
      inputElement.classList.remove("is-invalid");
      inputMessageElement.classList.replace("d-block", "d-none");
      inputElement.classList.add("is-valid");
      return true;
    } else {
      inputElement.classList.remove("is-valid");
      inputElement.classList.add("is-invalid");
      inputMessageElement.classList.replace("d-none", "d-block");
    }
  }
}
