document.addEventListener("DOMContentLoaded", function () {
  const sliderActive = document.querySelector(".slider-active");
  const voucherSlider = document.querySelector(".voucher-slider");

  sliderActive.addEventListener("click", function () {
    voucherSlider.classList.toggle("show");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const checkboxAdr = document.querySelector(".checkbox-adr");
  const adrSlider = document.querySelector(".adr-slider");

  checkboxAdr.addEventListener("change", function () {
    adrSlider.classList.toggle("show", this.checked);
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var radios = document.querySelectorAll(".radio");
  var descriptions = document.querySelectorAll(".description");

  function updateDescriptions() {
    descriptions.forEach(function (description) {
      description.classList.remove("show");
    });
    radios.forEach(function (radio) {
      if (radio.checked) {
        var description = radio.nextElementSibling;
        description.classList.add("show");
      }
    });
  }

  updateDescriptions();
  radios.forEach(function (radio) {
    radio.addEventListener("change", updateDescriptions);
  });
});
// function getCartItems() {
//   var cartItems = sessionStorage.getItem("");
//   cartItems = JSON.parse(cartItems);
//   cartItems.forEach((items) => {});
// }
