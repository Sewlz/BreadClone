document.addEventListener("DOMContentLoaded", function () {
  const widthIconUser = document.querySelector(
    ".user-functionality i"
  ).clientWidth;
  const lstProfile = document.querySelector(".lst-profile");
  lstProfile.style = `padding-left: ${widthIconUser}px;`;

  const inputFile = document.querySelector('input[type="file"]');
  const imgPreview = document.querySelector(".img-profile .img");
  const btnChooseImage = document.querySelector('button[type="button"]');

  btnChooseImage.addEventListener("click", function () {
    inputFile.click();
  });

  inputFile.addEventListener("change", function () {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      imgPreview.style.backgroundImage = `url(${e.target.result})`;
    };

    reader.readAsDataURL(file);
  });

  //   js input
  const nameInput = document.querySelector("#name");
  const emailInput = document.getElementById("email");
  const phoneNumberInput = document.getElementById("mobile-phone");

  const nameToggle = document.querySelector(".full-name p");
  const emailToggle = document.querySelector(".email-user p");
  const phoneNumberToggle = document.querySelector(".phonenumber p");

  let emailValue = emailInput.value;
  let phoneValue = phoneNumberInput.value;

  emailInput.value = maskInput(emailValue);
  phoneNumberInput.value = maskInput(phoneValue);

  nameToggle.addEventListener("click", () => {
    if (!nameInput.disabled) {
      nameInput.disabled = true;
      nameToggle.textContent = "Thay đổi";
    } else {
      nameInput.disabled = false;
      nameToggle.textContent = "Hủy";
    }
  });

  emailToggle.addEventListener("click", function () {
    toggleValue(emailInput, emailToggle, emailValue);
  });

  phoneNumberToggle.addEventListener("click", function () {
    toggleValue(phoneNumberInput, phoneNumberToggle, phoneValue);
  });

  function toggleValue(inputField, toggleElement, valueInput) {
    if (!inputField.disabled) {
      inputField.disabled = true;
      inputField.value = maskInput(inputField.value);
      toggleElement.textContent = "Thay đổi";
    } else {
      inputField.disabled = false;
      inputField.value = valueInput;
      toggleElement.textContent = "Hủy";
    }
  }

  function maskInput(value) {
    if (/^\d+$/.test(value)) {
      return "*".repeat(value.length - 2) + value.slice(-2);
    } else {
      const [username, domain] = value.split("@");
      return `${username.slice(0, 2)}${"*".repeat(
        username.length - 2
      )}@${domain}`;
    }
  }
});
