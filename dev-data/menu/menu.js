const countItemInCart = document.querySelector(".num-item-cart");
countItemInCart.textContent = "0";

const btnSearch = document.querySelector(".search-container a svg");
const btnClose = document.querySelector(".btn-close");
const button = document.querySelector(".search-container a");
const layoutSearch = document.querySelector(".search-main");

button.addEventListener("click", () => {
  const statusBtn = window.getComputedStyle(btnSearch).display;

  if (statusBtn === "block") {
    btnClose.style.display = "block";
    btnSearch.style.display = "none";
    layoutSearch.style.display = "flex";
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
  // menuLv2.classList.remove("active-menu-bar");
  // btnShowLv2.classList.remove("rotation-icon-down");
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
  // menuLv2.classList.remove("active-menu-bar");
  // btnShowLv2.classList.remove("rotation-icon-down");
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

  const searchMain = document.querySelector(".search-main form");
  const divUnderSearch = document.createElement("div");
  divUnderSearch.className = "result-search";
  searchMain.appendChild(divUnderSearch);

  // Function to search and display products
  function searchProducts() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    divUnderSearch.innerHTML = "";

    // Load the product data
    fetch("../../data/Product-data/product.json")
      .then((response) => response.json())
      .then((data) => {
        const products = [];

        for (const category in data.data) {
          data.data[category].forEach((product, index) => {
            products.push({ ...product, category, posIndex: index });
          });
        }

        // Filter products based on the search term
        const filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        );

        // Use a Set to track displayed products
        const displayedProducts = new Set();

        // Display the filtered products
        filteredProducts.forEach((product) => {
          if (!displayedProducts.has(product.name)) {
            displayedProducts.add(product.name);

            const productDiv = document.createElement("a");
            productDiv.href = "../ChiTietSanPham/chitietsanpham.html";
            productDiv.setAttribute("pos-index", product.posIndex);
            productDiv.setAttribute("category-product", product.category);
            productDiv.classList.add("product");

            const productName = document.createElement("h2");
            productName.textContent = product.name;
            productDiv.appendChild(productName);

            const productPrice = document.createElement("p");
            productPrice.textContent = product.price;
            productDiv.appendChild(productPrice);

            divUnderSearch.style = "display: block;";
            divUnderSearch.appendChild(productDiv);
          }
        });

        if (searchTerm === "" || filteredProducts.length < 1) {
          divUnderSearch.innerHTML = "";
          divUnderSearch.style = "display: none;";
        }

        const productSearch = document.querySelectorAll(
          ".result-search .product"
        );
        productSearch.forEach((item) => {
          item.addEventListener("click", () => {
            let posIndex = item.getAttribute("pos-index");
            let categoryProduct = item.getAttribute("category-product");
            sessionStorage.setItem("pos-index", posIndex);
            sessionStorage.setItem("category-product", categoryProduct);
          });
        });
      })
      .catch((error) => console.error("Error loading product data:", error));
  }

  // Attach the search function to the input event
  document.getElementById("search").addEventListener("input", searchProducts);

  // Xử lý khi click vào nút tìm kiếm
  const btnSearchInput = document.querySelector(".search-main button");
  btnSearchInput.addEventListener("click", (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById("search").value.toLowerCase();
    divUnderSearch.innerHTML = "";

    // Load the product data
    fetch("../../data/Product-data/product.json")
      .then((response) => response.json())
      .then((data) => {
        const products = [];

        for (const category in data.data) {
          data.data[category].forEach((product, index) => {
            products.push({ ...product, category, posIndex: index });
          });
        }

        // Filter products based on the search term
        const filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        );

        // Loại bỏ các sản phẩm trùng lặp
        const uniqueFilteredProducts = Array.from(
          new Set(filteredProducts.map((a) => a.name))
        ).map((name) => {
          return filteredProducts.find((a) => a.name === name);
        });

        // Chuyển đổi mảng uniqueFilteredProducts thành chuỗi JSON trước khi lưu vào sessionStorage
        const uniqueFilteredProductsJSON = JSON.stringify(
          uniqueFilteredProducts
        );
        sessionStorage.setItem("lstSearch", uniqueFilteredProductsJSON);
        sessionStorage.setItem("titlePageWebsite", "");
      })
      .catch((error) => console.error("Error loading product data:", error));

    window.location.href = "../Buns/buns.html";
  });
});

function addToCart() {
  event.preventDefault();
  const itemCell = document.querySelectorAll(".cell");
  let cartItems = sessionStorage.getItem("cartItems")
    ? JSON.parse(sessionStorage.getItem("cartItems"))
    : [];
  if (window.location.href.includes("ChiTietSanPham")) {
    console.log('The URL contains "ChiTietSanPham".');
    // Select the elements
    const imgElement = document.querySelector(".img-container img");
    const nameElement = document.querySelector(".name-product-detail");
    const priceElement = document.querySelector(".price-product-detail");
    const quanityElement = document.querySelector(".quantity");
    // Extract values
    const imgSrc = imgElement.src;
    const productName = nameElement.textContent.trim();
    const price = priceElement.textContent.trim();
    const quantity = quanityElement.value;
    // Create JSON object
    productInfo = {
      imgSrc: imgSrc,
      productName: productName,
      price: price,
      quantity: quantity,
    };
    var cartObj = productInfo;
    cartItems.push(cartObj);
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    location.reload();
    updateCart();
  } else {
    itemCell.forEach((item) => {
      item.querySelector(".button-product a").addEventListener("click", (e) => {
        e.preventDefault();

        var cartObj = convertItemToJson(item);
        cartItems.push(cartObj);

        sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
        location.reload();
        updateCart();
      });
    });
  }
}
function convertItemToJson(item) {
  // Select the elements
  const imgElement = item.querySelector(".img-product img");
  const nameElement = item.querySelector(".name-product");
  const priceElement = item.querySelector(".price");
  const quantity = "1";
  // Extract values
  const imgSrc = imgElement.src;
  const productName = nameElement.textContent.trim();
  const price = priceElement.textContent.trim();
  // Create JSON object
  const productInfo = {
    imgSrc: imgSrc,
    productName: productName,
    price: price,
    quantity: quantity,
  };
  return productInfo;
}
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
function cartHover() {
  var cartArray = sessionStorage.getItem("cartItems");
  if (cartArray !== null && cartArray !== "") {
    let index = 0;
    cartArray = JSON.parse(cartArray).splice(0, 3);
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
        <span class="price-item-cart-menu">${item.quantity}</span>
        x
        <span class="quantity-item-cart-menu">${
          parseInt(item.price) * parseInt(item.quantity)
        },000</span>
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
}
function HovertotalCalc() {
  var cartArray = sessionStorage.getItem("cartItems");
  if (cartArray !== null && cartArray !== "") {
    const total = JSON.parse(cartArray).reduce(
      (total, item) =>
        total +
        parseInt(item.price.replace(/,/g, "")) * parseInt(item.quantity),
      0
    );
    document.querySelector(
      ".subtotal-cart-menu > span:nth-child(2)"
    ).innerHTML = `Total: $${total.toLocaleString()}`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const btnProc = document.querySelectorAll(".button-product");
  btnProc.forEach((item) => {
    item.addEventListener("click", (event) => {
      addToCart();
    });
  });
  if (window.location.href.includes("ChiTietSanPham")) {
    const btnSubmit = document.querySelector(".btn-submit");
    btnSubmit.addEventListener("click", () => {
      addToCart();
    });
  }
  updateCart();
  cartHover();
  HovertotalCalc();
  const liItemCart = document.querySelector(".item-cart-menu");
  if (!liItemCart) {
    const ulListCart = document.querySelector(".cart-menu-container");
    ulListCart.style = "display:none!important;";
  }
});

const pageInProduct = document.querySelectorAll(".menu-sub_item a");
const pageMobileInProduct = document.querySelectorAll(".menu-bar_lv2 a");
pageInProduct.forEach((item) => {
  clickInMenuProduct(item);
});

pageMobileInProduct.forEach((item) => {
  clickInMenuProduct(item);
});

function clickInMenuProduct(item) {
  item.addEventListener("click", () => {
    sessionStorage.setItem("titlePageWebsite", item.textContent);
  });
}
