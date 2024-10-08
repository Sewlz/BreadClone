const btnApply = document.querySelector(".coupon-code button");
const inputApply = document.querySelector(".coupon-code input");
const notifi = document.querySelector(".notification-cart");

btnApply.addEventListener("click", (event) => {
  if (inputApply.value.trim() === "") {
    event.preventDefault();

    notifi.style.display = "block";
  }
});

// const chooseLocation = document.querySelector('.choose-location')
// const changeLocation = document.querySelector('.change-location')
// changeLocation.addEventListener('click', ()=>{
//     chooseLocation.classList.toggle('active-form-location')
// })
document.addEventListener("DOMContentLoaded", function () {
  var cartArray = sessionStorage.getItem("cartItems");
  if (cartArray !== null && cartArray !== "") {
    let index = 0;
    cartArray = JSON.parse(cartArray);
    const tbody = document.querySelector(".tb-cart");
    cartArray.forEach((item) => {
      const trow = document.createElement("tr");
      trow.classList.add("cart-item");
      trow.setAttribute("index", index);
      trow.innerHTML = `
        <td class="product-img">
                    <a href="../ChiTietSanPham/chitietsanpham.html">
                      <img
                        src="${item.imgSrc}"
                        alssst=""
                      />
                    </a>
                  </td>
                  <td class="product-name" data-title="Sản phẩm:">
                    <a href="../ChiTietSanPham/chitietsanpham.html"
                      >${item.productName}</a
                    >
                  </td>
                  <td class="product-price" data-title="Giá:">
                    <p>${item.price}</p>
                  </td>
                  <td class="product-quantity" data-title="Số lượng:">
                    <div class="btn-fun-quanity">
                      <button class="btn-minus button-number" type="button">
                        <i class="fa-solid fa-minus"></i>
                      </button>
                      <input
                        class="quantity"
                        type="number"
                        value="${item.quantity}"
                        step="1"
                        min="1"
                        name="quantity-001"
                        title="SL"
                        pattern="[0-9]*"
                        inputmode="numeric"
                      />
                      <button class="btn-plus button-number" type="button">
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </td>
                  <td class="product-subtotal" data-title="Tạm tính:">
                    <p>${item.price}</p>
                  </td>
                  <td class="product-remove">
                    <a href="#remove-item-001" class="remove-item-cart"">
                      <i class="fa-solid fa-trash"></i>
                    </a>
                  </td>
        `;
      tbody.insertBefore(trow, tbody.firstChild);
      index++;
    });
  } else {
    console.log("numCart is either null or empty.");
  }
  sendCartData();
  removeItem();
  //code quantityinput
  const btnMinus = document.querySelectorAll("tbody tr .btn-minus");
  const btnPlus = document.querySelectorAll("tbody tr .btn-plus");
  const quantityInput = document.querySelectorAll(".quantity");
  // const btnUpdate = document.querySelector(".update-cart");

  btnMinus.forEach((item, index) => {
    item.addEventListener("click", () => {
      const currentValue = parseInt(quantityInput[index].value);
      if (currentValue > 1) {
        quantityInput[index].value = currentValue - 1;
        totalCalc();
        sendCartData();
      }
    });
  });

  btnPlus.forEach((item, index) => {
    item.addEventListener("click", () => {
      quantityInput[index].value = parseInt(quantityInput[index].value) + 1;
      totalCalc();
      sendCartData();
    });
  });
  const quantityInputs = document.querySelectorAll(".quantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", () => {
      totalCalc();
      sendCartData();
    });
  });
  totalCalc();
});
function removeItem() {
  const removeButtons = document.querySelectorAll(".remove-item-cart");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(
        button.closest(".cart-item").getAttribute("index")
      );
      removeCartItem(index);
    });
  });
}
function removeCartItem(index) {
  var cartArray = sessionStorage.getItem("cartItems");
  if (cartArray !== null && cartArray !== "") {
    cartArray = JSON.parse(cartArray);
    cartArray.splice(index, 1);
    sessionStorage.setItem("cartItems", JSON.stringify(cartArray));
    console.log(cartArray);
    location.reload();
  } else {
    console.log("numCart is either null or empty.");
  }
}
function totalCalc() {
  const cartItems = document.querySelectorAll(".cart-item");
  const cartSub = document.querySelector(
    ".cart-subtotal > td:nth-child(2) > span:nth-child(1)"
  );
  const cartTotal = document.querySelector(
    ".order-total > td:nth-child(2) > span:nth-child(1)"
  );

  let subtotalSum = 0;

  cartItems.forEach((item) => {
    const subtotalElement = item.querySelector(".product-subtotal > p");
    const priceElement = item.querySelector(".product-price > p");
    const quantityElement = item.querySelector(".quantity");

    const price = parseInt(priceElement.innerHTML.replace(/,/g, ""));
    const quantity = parseInt(quantityElement.value);
    const subtotal = price * quantity;

    subtotalElement.innerHTML = subtotal.toLocaleString();
    subtotalSum += subtotal;
  });

  const formattedSubtotal = subtotalSum.toLocaleString();
  cartSub.innerHTML = formattedSubtotal;
  cartTotal.innerHTML = formattedSubtotal;
}

function sendCartData() {
  const payBtn = document.querySelector(".process-pay");
  if (!payBtn._hasClickEvent) {
    payBtn._hasClickEvent = true;
    payBtn.addEventListener("click", (event) => {
      const tItem = document.querySelectorAll(".cart-item");
      var totalCartItem = [];
      tItem.forEach((item) => {
        var totalObj = convertTotalItemToJson(item);
        totalCartItem.push(totalObj);
      });
      sessionStorage.setItem("totalCartItems", JSON.stringify(totalCartItem));
      console.log(totalCartItem);
    });
  }
}

function convertTotalItemToJson(item) {
  // Select the elements
  const nameElement = item.querySelector(".product-name a");
  const priceElement = item.querySelector(".product-subtotal p");
  const quantityElement = item.querySelector(".quantity");
  // Extract values
  const productName = nameElement.textContent.trim();
  const price = priceElement.textContent.trim();
  const quantity = quantityElement.value;
  // Create JSON object
  const productInfo = {
    productName: productName,
    price: price,
    quantity: quantity,
  };
  return productInfo;
}
