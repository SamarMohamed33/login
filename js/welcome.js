let welcomeMessageField = document.getElementById("user-name");

var user = JSON.parse(localStorage.getItem("loggedInUser"));
if (user !== null) {
  welcomeMessageField.innerHTML = user;
}

function logout() {
  window.location.href = "index.html";
  localStorage.removeItem("loggedInUser");
}
