const btnApply = document.querySelector(".coupon-code button");
const inputApply = document.querySelector(".coupon-code input");
const notifi = document.querySelector(".notification-cart");

btnApply.addEventListener("click", (event) => {
  if (inputApply.value.trim() === "") {
    event.preventDefault();

    notifi.style.display = "block";
  }
});

//code quantityinput
const btnMinus = document.querySelectorAll("tbody tr .btn-minus");
const btnPlus = document.querySelectorAll("tbody tr .btn-plus");
const quantityInput = document.querySelectorAll(".quantity");
const btnUpdate = document.querySelector(".update-cart");

btnMinus.forEach((item, index) => {
  item.addEventListener("click", () => {
    const currentValue = parseInt(quantityInput[index].value);
    if (currentValue > 1) {
      quantityInput[index].value = currentValue - 1;
    }
  });
});

btnPlus.forEach((item, index) => {
  item.addEventListener("click", () => {
    quantityInput[index].value = parseInt(quantityInput[index].value) + 1;
  });
});

// const chooseLocation = document.querySelector('.choose-location')
// const changeLocation = document.querySelector('.change-location')
// changeLocation.addEventListener('click', ()=>{
//     chooseLocation.classList.toggle('active-form-location')
// })
document.addEventListener("DOMContentLoaded", function () {
  fetch("../../data/Product-data/product.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const products = data.data["mushroom cheese sausage"];
      const posArrString = sessionStorage.getItem("numCart");

      if (posArrString !== null && posArrString !== "") {
        const posArr = posArrString.split(",").map(Number);
        const tbody = document.querySelector(".tb-cart");
        let index = 0;
        posArr.forEach((item) => {
          const product = products[item];
          const trow = document.createElement("tr");
          trow.classList.add("cart-item");
          trow.setAttribute("index", index);
          trow.innerHTML = `
          <td class="product-img">
                      <a href="../ChiTietSanPham/chitietsanpham.html">
                        <img
                          src="${product.img}"
                          alssst=""
                        />
                      </a>
                    </td>
                    <td class="product-name" data-title="Sản phẩm:">
                      <a href="../ChiTietSanPham/chitietsanpham.html"
                        >${product.name}</a
                      >
                    </td>
                    <td class="product-price" data-title="Giá:">
                      <p>34,000</p>
                    </td>
                    <td class="product-quantity" data-title="Số lượng:">
                      <div class="btn-fun-quanity">
                        <button class="btn-minus button-number" type="button">
                          <i class="fa-solid fa-minus"></i>
                        </button>
                        <input
                          class="quantity"
                          type="number"
                          value="1"
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
                      <p>${product.price}</p>
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
      removeItem();
    });
});

function removeItem() {
  const removeButtons = document.querySelectorAll(".remove-item-cart");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get the index attribute of the parent tr element
      const index = parseInt(
        button.closest(".cart-item").getAttribute("index")
      );
      removeCartItem(index);
    });
  });
}

function removeCartItem(index) {
  const posArrString = sessionStorage.getItem("numCart");
  if (posArrString !== null && posArrString !== "") {
    let posArr = posArrString.split(",").map(Number);
    posArr.splice(index, 1);
    sessionStorage.setItem("numCart", posArr.join(","));
    console.log(posArr);
    location.reload();
  } else {
    console.log("numCart is either null or empty.");
  }
}
