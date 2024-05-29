fetch("../../data/home-data/slide-banner.json")
  .then((response) => response.json())
  .then((data) => {
    const images = data.images;
    const slidesWrapper = document.querySelector(".swiper-wrapper-banner");
    images.forEach((imageUrl, index) => {
      const swiperSlide = document.createElement("div");
      swiperSlide.classList.add("swiper-slide");
      swiperSlide.innerHTML = `<img src="${imageUrl}" alt="Image ${
        index + 1
      }">`;
      slidesWrapper.appendChild(swiperSlide);
    });
  })
  .catch((error) => console.error("Error fetching JSON:", error));

// Initialize Swiper
var swiper = new Swiper(".myBannerSwiper", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//animation script
document.addEventListener("DOMContentLoaded", function () {
  var scrollAnimation = document.getElementById("scrollAnimation");
  var scrollAnimation2 = document.getElementById("scrollAnimation2");
  var decoAnimation = document.getElementById("decoAnimation");
  var decoAnimation2 = document.getElementById("decoAnimation2");
  var hbAnimation = document.getElementById("hbAnimation");
  var animationTriggered = false;

  window.addEventListener("scroll", function () {
    if (!animationTriggered && isElementInViewport(scrollAnimation)) {
      scrollAnimation.style.animation = "scrollAnimation 1s ease forwards";
      scrollAnimation2.style.animation = "scrollAnimation2 1s ease forwards";
      animationTriggered = true;
    }
    if (isElementInViewport(decoAnimation)) {
      decoAnimation.style.animation = "decoAnimation 1s ease forwards";
      decoAnimation2.style.animation = "decoAnimation2 1s ease forwards";
    }
    if (isElementInViewport(hbAnimation)) {
      hbAnimation.style.animation = "hbAnimation 1s ease forwards";
    }
  });

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
});
//swiper script
var swiper;

function initializeSwiper() {
  if (window.innerWidth.valueOf() <= 768) {
    swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      slidesPerGroup: 1,
      // loop: true,
      freeMode: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  } else {
    swiper = new Swiper(".mySwiper", {
      slidesPerView: 4,
      slidesPerGroup: 4,
      // loop: true,
      freeMode: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }
}

// Call initializeSwiper on page load
initializeSwiper();

// Call initializeSwiper when window is resized
window.addEventListener("resize", function () {
  initializeSwiper();
});

console.log(window.innerWidth);
//product swiper loader
fetch("../../data/home-data/homeProduct.json")
  .then((response) => response.json())
  .then((data) => {
    const product = data.product;
    const swiperWrapper = document.getElementById("swiper-wrapper");

    product.forEach((product) => {
      const swiperSlide = document.createElement("div");
      swiperSlide.classList.add("swiper-slide");
      swiperSlide.innerHTML = `
    <img src="${product.src}" alt="${product.alt}" onclick="document.location='../Buns/buns.html'" />
    <h4 onclick="document.location='../Buns/buns.html'">${product.alt}</h4>
    `;
      swiperWrapper.appendChild(swiperSlide);
    });

    const img1 = document.querySelectorAll(
      ".slection-container .swiper-slide img"
    );
    img1.forEach((item, index) => {
      item.addEventListener("click", () => {
        sessionStorage.setItem("titlePageWebsite", product[index].alt);
      });
    });
    const h41 = document.querySelectorAll(
      ".slection-container .swiper-slide h4"
    );
    h41.forEach((item, index) => {
      item.addEventListener("click", () => {
        sessionStorage.setItem("titlePageWebsite", product[index].alt);
      });
    });
  });

//top product swiper loader
fetch("../../data/home-data/topProducts.json")
  .then((response) => response.json())
  .then((data) => {
    const topProducts = data.topProducts;
    console.log("🚀 ~ .then ~ topProducts:", topProducts);
    const swiperWrapperTop = document.querySelector(
      "div.swiper:nth-child(4) > div:nth-child(1)"
    );
    topProducts.forEach((topProducts) => {
      const swiperSlide = document.createElement("div");
      swiperSlide.classList.add("swiper-slide");
      swiperSlide.classList.add("cell");
      swiperSlide.innerHTML = `
      <div class="img-product">
      <img src="${topProducts.src}" alt="${topProducts.alt}" onclick="document.location='../ChiTietSanPham/chitietsanpham.html'" />
      </div>
      <div class="top-product-info">
        <h4 class="top-product-title name-product" onclick="document.location='../ChiTietSanPham/chitietsanpham.html'">${topProducts.alt}</h4>
        <span class="top-product-price price">${topProducts.price}</span>
      </div>
      <button class="button-product" id="more-btn-2" onclick="addToCart();" style="border: 1px solid black; color: black; max-width: 250px; box-sizing: border-box;"><a href="#" style="text-decoration: none; color: black;">Thêm vào giỏ hàng</a></button>
    `;
      swiperWrapperTop.appendChild(swiperSlide);
    });

    const imgProduct = document.querySelectorAll(".img-product");
    const topProductInfor = document.querySelectorAll(".top-product-info");
    imgProduct.forEach((item, index) => {
      clickTopProducts(item, index);
    });
    topProductInfor.forEach((item, index) => {
      clickTopProducts(item, index);
    });

    function clickTopProducts(item, index) {
      item.addEventListener("click", () => {
        let posIndex = topProducts[index].posIndex;
        let category = topProducts[index].category;
        sessionStorage.setItem("pos-index", posIndex);
        sessionStorage.setItem("category-product", category);
      });
    }
  });
//swiper review script
var swiper = new Swiper(".myReviewSwiper", {
  loop: true,
  navigation: {
    nextEl: ".swiper-button-prev-unique",
    prevEl: ".swiper-button-next-unique",
  },
});
fetch("../../data/home-data/review.json")
  .then((response) => response.json())
  .then((data) => {
    const review = data.review;
    const swiperWrapperReview = document.querySelector(
      ".swiper-review-wrapper"
    );
    review.forEach((review) => {
      const swiperSlide = document.createElement("div");
      swiperSlide.classList.add("swiper-slide", "swiper-review-slide");
      swiperSlide.innerHTML = `
    <div class="text-wrapper"><p>${review.review}</p></div>
    <div class="profile-container">
      <div class="profile-wrapper"><img src="${review.src}" alt="${review.alt}" /></div>
      <h6>${review.alt}</h6>
    </div>`;
      swiperWrapperReview.appendChild(swiperSlide);
    });
  });
//swiper news script
var swiperNews;
function initializeNewsSwiper() {
  if (window.innerWidth.valueOf() <= 768) {
    swiperNews = new Swiper(".newsSwiper", {
      slidesPerView: 1,
      slidesPerGroup: 1,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  } else {
    swiperNews = new Swiper(".newsSwiper", {
      slidesPerView: 3,
      slidesPerGroup: 3,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }
}
// Call initializeSwiper on page load
initializeNewsSwiper();
// Call initializeSwiper when window is resized
window.addEventListener("resize", function () {
  initializeNewsSwiper();
});
fetch("../../data/blog-data/blog.json")
  .then((response) => response.json())
  .then((data) => {
    const news = data.blog;
    const swiperWrapperNews = document.querySelector(".news-swiper-wrapper");
    let index = 0;
    news.forEach((news) => {
      const swiperSlide = document.createElement("div");
      swiperSlide.classList.add("swiper-slide", "swiper-slide-news");
      swiperSlide.setAttribute("index", index);
      swiperSlide.innerHTML = `
      <article class="news-wrapper">
          <div class="news-img"><img src="${news.src}" alt=""></div>
          <div class="news-content">
              <h6>${news.headline}</h6>
              <p>${news.content}</p>
          </div>
          <div class="view-more"><i class="fa fa-solid fa-chevron-right"></i></div>
          <div class="outline"></div>                        
      </article>       
      `;
      swiperWrapperNews.appendChild(swiperSlide);
      index++;
      swiperSlide.addEventListener("click", () => {
        sendParaData(
          "../../data/blog-data/blog.json",
          swiperSlide.getAttribute("index")
        );
        window.location.href = "../news/news.html";
      });
    });
  });
function sendParaData(fileName, index) {
  sessionStorage.setItem("newsUrl", fileName);
  sessionStorage.setItem("newsIndex", index);
}
document.addEventListener("DOMContentLoaded", function () {
  const swiperSlide = document.querySelectorAll(".swiper-slide-news");
  swiperSlide.forEach((item) => {
    item.addEventListener("click", function (event) {
      console.log("clicked");
    });
  });
});
