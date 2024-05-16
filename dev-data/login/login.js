const showPass = document.querySelector(".fa-eye-slash");
const hidePass = document.querySelector(".fa-eye");
const inputPass = document.querySelector("#password");
const inputUser = document.querySelector("#username");
const alertUser = document.querySelector(".username-alert");
const alertPass = document.querySelector(".password-alert");

showPass.addEventListener("click", () => {
  hidePass.style = "display: inline-block;";
  showPass.style = "display: none;";
  inputPass.type = "text";
});
hidePass.addEventListener("click", () => {
  showPass.style = "display: inline-block;";
  hidePass.style = "display: none;";
  inputPass.type = "password";
});

inputUser.addEventListener("focus", () => {
  alertUser.innerHTML =
    '<i style="color:#2d80cb; padding:5px; font-size:small;" class="fa-solid fa-check"></i> <span>Nhập số điện thoại hoặc email</span>';
});

inputUser.addEventListener("blur", function () {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPhoneNumber = /^\d{10,}$/;
  const value = inputUser.value.trim();

  if (regexEmail.test(value) || regexPhoneNumber.test(value)) {
    alertUser.innerHTML =
      '<i style="color:green; padding:5px; font-size:small;" class="fa-solid fa-check"></i> <span>Nhập số điện thoại hoặc email</span>';
    inputUser.style = "border: 2px solid green;";
  } else {
    alertUser.innerHTML =
      '<i style="color:#2d80cb; padding:5px; font-size:small;" class="fa-solid fa-exclamation"></i> <span>Nhập số điện thoại hoặc email</span>';
    inputUser.style = "border: 2px solid red;";
  }
});

inputPass.addEventListener("focus", () => {
  alertPass.innerHTML =
    '<i style="color:#2d80cb; padding:5px; font-size:small;" class="fa-solid fa-check"></i> <span>Hãy nhập mật khẩu</span>';
});
inputPass.addEventListener("blur", () => {
  const value = inputPass.value.trim();
  if (value === "") {
    alertPass.innerHTML =
      '<i style="color:#2d80cb; padding:5px; font-size:small;" class="fa-solid fa-exclamation"></i> <span>Hãy nhập mật khẩu</span>';
    inputPass.style = "border: 2px solid red;";
  } else {
    alertPass.innerHTML =
      '<i style="color:green; padding:5px; font-size:small;" class="fa-solid fa-check"></i> <span>Hãy nhập mật khẩu</span>';
    inputPass.style = "border: 2px solid green;";
  }
});
