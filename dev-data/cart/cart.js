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
const btnUpdate = document.querySelector('.update-cart')

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

const chooseLocation = document.querySelector('.choose-location')
const changeLocation = document.querySelector('.change-location')
changeLocation.addEventListener('click', ()=>{
    chooseLocation.classList.toggle('active-form-location')
})


