document.addEventListener("DOMContentLoaded", function () {
  const sliderActive = document.querySelector(".slider-active");
  const voucherSlider = document.querySelector(".voucher-slider");

  sliderActive.addEventListener("click", function () {
    voucherSlider.classList.toggle("show");
  });
  getCartItems();
  totalOrderCalc();
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
function getCartItems() {
  var cartItems = sessionStorage.getItem("totalCartItems");
  cartItems = JSON.parse(cartItems);
  const tbody = document.querySelector(
    ".total-wrapper > table:nth-child(1) > tbody:nth-child(1)"
  );
  cartItems.forEach((items) => {
    const procWrapper = document.createElement("tr");
    procWrapper.classList.add("product-sum");
    procWrapper.innerHTML = ` 
    <td>
      <div>
        <span id="color">${items.productName} </span>
        <div>
          <span>x${items.quantity}</span>
          <span id="color"><b>${items.price}</b></span>
        </div>
      </div>
    </td>`;
    tbody.appendChild(procWrapper);
  });
}
function totalOrderCalc() {
  const subtotal = document.querySelector(".sub-total-price > b:nth-child(1)");
  const total = document.querySelector(".total-price > b:nth-child(1)");
  const shipping = document.querySelector(".shipping-price > b:nth-child(1)");
  var cartItems = sessionStorage.getItem("totalCartItems");
  shipping.innerHTML = 35 + ",000₫";
  cartItems = JSON.parse(cartItems);
  cartItems.forEach((items) => {
    subtotal.innerHTML =
      parseInt(subtotal.innerHTML) +
      parseInt(items.price) * items.quantity +
      ",000₫";
  });
  total.innerHTML =
    parseInt(subtotal.innerHTML) + parseInt(shipping.innerHTML) + ",000₫";
}
