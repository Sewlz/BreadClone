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
  const random = Math.floor(Math.random() * 900000) + 100000;
  document.querySelector("#random-num").innerHTML =
    '<span class="bold">Nội dung chuyển khoản:</span>' + " MDH" + random;
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
  const subtotalElement = document.querySelector(
    ".sub-total-price > b:nth-child(1)"
  );
  const totalElement = document.querySelector(".total-price > b:nth-child(1)");
  const shippingElement = document.querySelector(
    ".shipping-price > b:nth-child(1)"
  );

  // Initialize the values
  let subtotal = 0;
  const shippingCost = 35000; // Assuming the shipping cost is 35,000₫

  // Set the shipping cost
  shippingElement.innerHTML = shippingCost.toLocaleString() + "₫";

  // Retrieve and parse the cart items from session storage
  let cartItems = sessionStorage.getItem("totalCartItems");
  cartItems = JSON.parse(cartItems);

  // Calculate the subtotal
  cartItems.forEach((item) => {
    const itemPrice = parseInt(item.price.replace(/,/g, ""));
    const itemQuantity = parseInt(item.quantity);
    subtotal += itemPrice * itemQuantity;
  });

  // Update the subtotal and total elements
  subtotalElement.innerHTML = subtotal.toLocaleString() + "₫";
  const total = subtotal + shippingCost;
  totalElement.innerHTML = total.toLocaleString() + "₫";
}
function getCity() {
  const citySelects = document.querySelectorAll(".city-selector");
  citySelects.forEach((citySelect) => {
    fetch("../../data/location-data/tinh_tp.json")
      .then((response) => response.json())
      .then((data) => {
        for (const code in data) {
          if (data.hasOwnProperty(code)) {
            const option = document.createElement("option");
            option.value = data[code].name;
            option.text = data[code].name;
            option.setAttribute("code-city", data[code].code);
            citySelect.appendChild(option);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching city data:", error);
      });
  });

  document.querySelector(".city-selector").addEventListener("change", () => {
    const citySelect = document.querySelector(".city-selector");
    const provinceSelect = document.querySelector(".province-selector");
    const wardSelect = document.querySelector(".ward-selector");

    // Clear previous options
    provinceSelect.innerHTML = "<option value=''> Chọn Quận/Huyện </option>";
    wardSelect.innerHTML = "<option value=''> Chọn Xã/Phường </option>";

    const selectedCityCode =
      citySelect.options[citySelect.selectedIndex].getAttribute("code-city");
    if (selectedCityCode) {
      getProvince(selectedCityCode);
    }
  });
}
function getProvince(parentCityCode) {
  const provinceSelects = document.querySelectorAll(".province-selector");
  provinceSelects.forEach((provinceSelect) => {
    fetch("../../data/location-data/quan_huyen.json")
      .then((response) => response.json())
      .then((data) => {
        for (const code in data) {
          if (data[code].parent_code === parentCityCode) {
            const option = document.createElement("option");
            option.setAttribute("code-province", code);
            option.value = data[code].name;
            option.text = data[code].name;
            provinceSelect.appendChild(option);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching province data:", error);
      });
  });

  document
    .querySelector(".province-selector")
    .addEventListener("change", () => {
      const provinceSelect = document.querySelector(".province-selector");
      const wardSelect = document.querySelector(".ward-selector");

      // Clear previous options
      wardSelect.innerHTML = "<option value=''> Chọn Xã/Phường </option>";

      const selectedProvinceCode =
        provinceSelect.options[provinceSelect.selectedIndex].getAttribute(
          "code-province"
        );
      if (selectedProvinceCode) {
        getWard(selectedProvinceCode);
      }
    });
}
function getWard(parentProvinceCode) {
  const wardSelects = document.querySelectorAll(".ward-selector");
  wardSelects.forEach((wardSelect) => {
    fetch("../../data/location-data/xa_phuong.json")
      .then((response) => response.json())
      .then((data) => {
        for (const code in data) {
          if (data[code].parent_code === parentProvinceCode) {
            const option = document.createElement("option");
            option.value = data[code].name;
            option.text = data[code].name;
            wardSelect.appendChild(option);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching ward data:", error);
      });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  getCity();
});
