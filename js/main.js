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

if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
}

var found = false;
var loggedIn = false;
var userName = "";
function signUp() {
  if (
    nameValidation.test(nameInput.value) &&
    emailValidation.test(emailInput.value) &&
    passwordValidation.test(passwordInput.value)
  ) {
    var checkRepeatedUser = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === emailInput.value) {
        checkRepeatedUser = true;
      }
    }
    if (checkRepeatedUser) {
      showError(signupMessgae, "Already exists");
    } else {
      let newUser = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      showError(signupMessgae, "Success");
      clearFields();
    }
  } else {
    showError(signupMessgae, "Please enter a valid name and email");
  }
}

function signIn() {
  console.log("sign in");
  if (
    emailValidation.test(emailInput.value) &&
    passwordValidation.test(passwordInput.value)
  ) {
    for (let i = 0; i < users.length; i++) {
      if (
        emailInput.value == users[i].email &&
        passwordInput.value == users[i].password
      ) {
        found = true;
        localStorage.setItem("loggedInUser", JSON.stringify(users[i].name));
      }
    }
    if (found) {
      loggedIn = true;
      window.location.href = "../welcome.html";
    } else {
      showError(signinMessage, " The email or password is wrong.");
    }
  } else {
    showError(signinMessage, " The email or password is wrong.");
  }
}

function showError(messageBox, msg) {
  messageBox.style.cssText = `
    display: block !important
    `;
  messageBox.innerHTML = msg;
}

function clearFields() {
  emailInput.value = "";
  passwordInput.value = "";
  nameInput.value = "";
}

window.addEventListener("", function () {
  console.log(window.location.href);
  console.log(loggedIn);
  if (window.location.href == "../welcome.html") {
    if (loggedIn === false) console.log(loggedIn);
  }
});
