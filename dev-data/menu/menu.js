const btnSearch = document.querySelector(".search-container a svg");
const btnClose = document.querySelector(".btn-close");
const button = document.querySelector(".search-container a");
const layoutSearch = document.querySelector(".search-main");

button.addEventListener("click", () => {
  const statusBtn = window.getComputedStyle(btnSearch).display;

  if (statusBtn === "block") {
    btnClose.style.display = "block";
    btnSearch.style.display = "none";
    layoutSearch.style.display = "block";
  } else {
    btnClose.style.display = "none";
    btnSearch.style.display = "block";
    layoutSearch.style.display = "none";
  }
});

// js menu bar
const menuBar = document.querySelector(".menu-bar-container");
const layoutCoating = document.querySelector(".layout-close-menu-bar");
const btnCloseMenu = document.querySelector(".button-close-menu");

function resetMenuBar() {
  menuLv1.classList.remove("active-menu-bar");
  btnShowLv1.classList.remove("rotation-icon-down");
  menuLv2.classList.remove("active-menu-bar");
  btnShowLv2.classList.remove("rotation-icon-down");
  itemBarClose[0].style = `transform: rotate(0)`;
  itemBarClose[1].style = `transform: rotate(0)`;
}

btnCloseMenu.addEventListener("click", () => {
  menuBar.style = "transform: translateX(-100%)";
  layoutCoating.style.display = "none";
  resetMenuBar();
});

layoutCoating.addEventListener("click", () => {
  menuBar.style = "transform: translateX(-100%)";
  layoutCoating.style.display = "none";
  resetMenuBar();
});

const btnShowLv2 = document.querySelector(".menu-bar_lv2 i");
const btnShowLv1 = document.querySelector(".menu-bar_lv1 div > i");
const menuLv2 = document.querySelector(".menu-bar-wrapper_lv3");
const menuLv1 = document.querySelector(".menu-bar-container_lv2");

btnShowLv1.addEventListener("click", () => {
  menuLv1.classList.toggle("active-menu-bar");
  btnShowLv1.classList.toggle("rotation-icon-down");
  menuLv2.classList.remove("active-menu-bar");
  btnShowLv2.classList.remove("rotation-icon-down");
  menuBar.style.overflow = "auto";
});

// btnShowLv2.addEventListener("click", () => {
//   menuLv2.classList.toggle("active-menu-bar");
//   btnShowLv2.classList.toggle("rotation-icon-down");
// });

const btnMenuBar = document.querySelector(".btn-menu-bar");
const itemBarClose = document.querySelectorAll(".menu-bar");
const degClose = 135;

btnMenuBar.addEventListener("click", () => {
  menuBar.style = "transform: translateX(0)";
  itemBarClose[0].style = `transform: rotate(${degClose}deg)`;
  itemBarClose[1].style = `transform: rotate(${-degClose}deg)`;
  layoutCoating.style.display = "block";
});

// js scroll to top
const elementScroll = document.querySelector(".scroll-to-top");
const elementMenu = document.querySelector(".menu-main");
var bodyHeight = document.documentElement.clientHeight;

window.addEventListener("resize", (e) => {
  bodyHeight = document.documentElement.clientHeight;
});

window.addEventListener("scroll", (e) => {
  var scrollHeight = window.scrollY;
  var menuHeight = elementMenu.offsetHeight;
  const totalHeight = bodyHeight / 2 + menuHeight;
  scrollHeight >= totalHeight
    ? elementScroll.classList.add("active-scroll-to-top")
    : elementScroll.classList.remove("active-scroll-to-top");
});

function scrollToTop(duration) {
  var scrollHeight = window.scrollY,
    scrollStep = Math.PI / (duration / 15),
    cosParameter = scrollHeight,
    scrollCount = 0,
    scrollMargin,
    scrollInterval = setInterval(function () {
      if (window.scrollY != 0) {
        scrollCount += scrollStep;
        scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount);
        window.scrollTo(0, scrollHeight - scrollMargin);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
}

elementScroll.addEventListener("click", (e) => {
  scrollToTop(1000);
});

document.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.querySelector(".btn-Login");
  const iconLogin = document.querySelector(".element-login a");
  const logout = document.querySelectorAll(".item-account");
  const iconLogout = logout[logout.length - 1];
  const menuAccount = document.querySelector(
    ".account-container .menu-account"
  );
  const elementUsername = document.querySelector(".element-login p");

  let isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  function handleLogin() {
    const username = "User";
    isLoggedIn = true;

    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("username", username);

    updateNavigation();
  }

  function updateNavigation() {
    if (isLoggedIn) {
      iconLogin.innerHTML = '<i class="fa-solid fa-user"></i>';
      iconLogin.href = "../profile/profile.html";
      elementUsername.innerText = sessionStorage.getItem("username");
      menuAccount.classList.add("show-menu-account");
    } else {
      iconLogin.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';
      iconLogin.href = "../login/login.html";
      elementUsername.innerText = "Login";
      menuAccount.classList.remove("show-menu-account");
    }
  }
  if (btnLogin != null) {
    btnLogin.addEventListener("click", () => {
      handleLogin();
      const loginForm = document.querySelector(".login-form");

      loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        window.location.href = "../home/Home.html";
      });
    });
  }

  iconLogout.addEventListener("click", () => {
    if (isLoggedIn) {
      isLoggedIn = false;

      sessionStorage.removeItem("isLoggedIn");
      sessionStorage.removeItem("username");

      updateNavigation();
      window.location.href = "../home/Home.html";
    }
  });

  const itemLogout = document.querySelector(".profile-item:last-child");
  if (itemLogout) {
    itemLogout.addEventListener("click", () => {
      if (isLoggedIn) {
        isLoggedIn = false;

        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("username");

        updateNavigation();
      }
    });
  }

  updateNavigation();
});

function addToCart() {
  event.preventDefault();

  const itemCell = document.querySelectorAll(".cell");
  let cartItems = sessionStorage.getItem("cartItems")
    ? JSON.parse(sessionStorage.getItem("cartItems"))
    : [];

  itemCell.forEach((item) => {
    item.querySelector(".button-product a").addEventListener("click", (e) => {
      e.preventDefault();

      var cartObj = convertItemToJson(item);
      cartItems.push(cartObj);

      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCart();
    });
  });

  console.log(cartItems);
}
function convertItemToJson(item) {
  // Select the elements
  const imgElement = item.querySelector(".img-product img");
  const nameElement = item.querySelector(".name-product");
  const priceElement = item.querySelector(".price");

  // Extract values
  const imgSrc = imgElement.src;
  const productName = nameElement.textContent.trim();
  const price = priceElement.textContent.trim();

  // Create JSON object
  const productInfo = {
    imgSrc: imgSrc,
    productName: productName,
    price: price,
  };

  return productInfo;
}
document.addEventListener("DOMContentLoaded", function () {
  updateCart();
});
function updateCart() {
  const numCart = document.querySelector(".num-item-cart");
  const numCartValue = sessionStorage.getItem("cartItems");

  if (numCartValue !== null) {
    const cartArray = JSON.parse(numCartValue);
    let cartSize = cartArray.length;
    numCart.innerText = cartSize;
  } else if (numCartValue === null) {
    numCart.innerText = 0;
  }
  console.log(sessionStorage.getItem("cartItems"));
}

document.addEventListener("DOMContentLoaded", function () {
  var cartArray = sessionStorage.getItem("cartItems");
  if (cartArray !== null && cartArray !== "") {
    let index = 0;
    cartArray = JSON.parse(cartArray);
    const ulbody = document.querySelector(".list-cart-menu");
    cartArray.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("item-cart-menu");
      listItem.setAttribute("index", index);
      listItem.innerHTML = `
      <div class="img-cart-menu">
      <a href="../ChiTietSanPham/chitietsanpham.html">
        <img src="${item.imgSrc}" alt="MUSHROOM CHEESE SAUSAGE">
      </a>
    </div>
    <div class="info-cart-menu">
      <h6 class="name-item-cart-menu">
        <a href="../ChiTietSanPham/chitietsanpham.html" class="uppercase">
          ${item.productName}
        </a>
      </h6>
      <div class="price-quantity">
        <span class="price-item-cart-menu">1</span>
        x
        <span class="quantity-item-cart-menu">${item.price}</span>
      </div>
      <a href="#remove-item-001" class="delete-item-cart-menu">
        <i class="fa-sharp fa-solid fa-xmark"></i>
      </a>
    </div>
        `;
      ulbody.insertBefore(listItem, ulbody.firstChild);
      index++;
    });
  } else {
    console.log("numCart is either null or empty.");
  }
  removeHoverItem();
});
function removeHoverItem() {
  const removeButtons = document.querySelectorAll(".delete-item-cart-menu");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(
        button.closest(".item-cart-menu").getAttribute("index")
      );
      removeCartHoverItem(index);
    });
  });
}

function removeCartHoverItem(index) {
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
