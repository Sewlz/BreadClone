function showMoreCharacterMessage(inputId, alertClassName) {
  var inputValue = document.getElementById(inputId).value.trim();
  var alertElement = document.querySelector("." + alertClassName);
  document.getElementById(inputId).style.border = "1px solid #ccc";
  if (inputValue.length === 0) {
    if (inputId === "password") {
      alertElement.innerHTML = `<i class="fa fa-solid fa-check" style="color: #2d80cb; padding: 5px"></i>
        <span> Enter at least 1 character </span>`;
      alertElement.style.display = "block";
    } else if (inputId === "name") {
      alertElement.innerHTML = `<i class="fa fa-solid fa-check" style="color: #2d80cb; padding: 5px"></i>
            <span> Enter at least 1 character </span>`;
      alertElement.style.display = "block";
    } else if (inputId === "email") {
      alertElement.innerHTML = `<i class="fa fa-solid fa-check" style="color: #2d80cb; padding: 5px"></i>
        <span>  Enter your email or mobile phone number  </span>`;
      alertElement.style.display = "block";
    }
  } else if (inputValue.length > 0) {
    if (inputId === "re-enter") {
      if (inputValue !== document.getElementById("password").value) {
        alertElement.innerHTML = `<i class="fa-solid fa-exclamation" style="color: #2d80cb; padding: 5px"></i>
          <span> Password does not match </span>`;
        alertElement.style.display = "block";
      } else if (inputValue === document.getElementById("password").value) {
        alertElement.innerHTML = "";
        alertElement.style.display = "none";
      }
    }
  }
}

function inputChecker(inputId, alertClassName) {
  var inputValue = document.getElementById(inputId).value.trim();
  var alertElement = document.querySelector("." + alertClassName);
  if (inputValue === "") {
    document.getElementById(inputId).style.border = "2px solid #ff0000";
    if (inputId === "password") {
      alertElement.innerHTML = `<i class="fa-solid fa-exclamation" style="color: #2d80cb; padding: 5px"></i>
        <span> Enter a password  </span>`;
      alertElement.style.display = "block";
    } else if (inputId === "name") {
      alertElement.innerHTML = `<i class="fa-solid fa-exclamation" style="color: #2d80cb; padding: 5px"></i>
          <span> Enter your name  </span>`;
      alertElement.style.display = "block";
    } else if (inputId === "email") {
      alertElement.innerHTML = `<i class="fa-solid fa-exclamation" style="color: #2d80cb; padding: 5px"></i>
              <span> Enter your email or mobile phone number  </span>`;
      alertElement.style.display = "block";
    }
  } else {
    alertElement.innerHTML = "";
    alertElement.style.display = "none";
  }
}

document.getElementById("name").addEventListener("blur", function (event) {
  var nameAlert = document.querySelector(".name-alert");
  inputChecker("name", "name-alert");
});

document.getElementById("email").addEventListener("blur", function (event) {
  var emailAlert = document.querySelector(".email-alert");
  inputChecker("email", "email-alert");
});

document.getElementById("password").addEventListener("blur", function (event) {
  var passwordAlert = document.querySelector(".password-alert");
  inputChecker("password", "password-alert");
});

document.getElementById("re-enter").addEventListener("blur", function (event) {
  var reEnterAlert = document.querySelector(".re-enter-alert");
  inputChecker("re-enter", "re-enter-alert");
});
