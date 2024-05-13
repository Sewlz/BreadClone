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

btnShowLv2.addEventListener("click", () => {
  menuLv2.classList.toggle("active-menu-bar");
  btnShowLv2.classList.toggle("rotation-icon-down");
});

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
