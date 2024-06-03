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

    // Initialize Swiper inside the fetch's then block
    var swiper;
    swiper = new Swiper(".myBannerSwiper", {
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
    swiper.autoplay.start();
    document
      .querySelector(".swiper-button-next")
      .addEventListener("click", function () {
        swiper.slideNext();
        swiper.autoplay.start();
      });

    document
      .querySelector(".swiper-button-prev")
      .addEventListener("click", function () {
        swiper.slidePrev();
        swiper.autoplay.start();
      });
  })
  .catch((error) => console.error("Error fetching JSON:", error));

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
//swiper product script
let swiper;
function initializeSwiper() {
  if (swiper) {
    swiper.destroy(true, true);
  }
  // Initialize Swiper based on window width
  swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    freeMode: false,
    breakpoints: {
      500: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      700: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      900: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
function loadHomeProductSwiper() {
  fetch("../../data/home-data/homeProduct.json")
    .then((response) => response.json())
    .then((data) => {
      const product = data.product;
      const swiperWrapper = document.querySelector(".mySwiper .swiper-wrapper");
      swiperWrapper.innerHTML = "";
      let index = 0;
      product.forEach((product) => {
        const swiperSlide = document.createElement("div");
        swiperSlide.classList.add("swiper-slide");
        swiperSlide.innerHTML = `
          <img src="${product.src}" alt="${product.alt}" data-index="${index}" onclick="document.location='../Buns/buns.html'" />
          <h4 data-index="${index}" onclick="document.location='../Buns/buns.html'">${product.alt}</h4>
        `;
        swiperWrapper.appendChild(swiperSlide);
        index++;
      });

      document
        .querySelectorAll(
          ".mySwiper .swiper-slide img, .mySwiper .swiper-slide h4"
        )
        .forEach((item) => {
          item.addEventListener("click", (event) => {
            const procIndex = event.target.dataset.index;
            sessionStorage.setItem(
              "titlePageWebsite",
              product[parseInt(procIndex)].alt
            );
          });
        });

      initializeSwiper();
    });
}

function loadTopProductSwiper() {
  fetch("../../data/home-data/topProducts.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const topProducts = data.topProducts;
      const swiperWrapperTop = document.querySelector(
        "div.swiper:nth-child(4) > div.swiper-wrapper"
      );

      swiperWrapperTop.innerHTML = "";
      topProducts.forEach((product, index) => {
        const swiperSlide = document.createElement("div");
        swiperSlide.classList.add("swiper-slide", "cell");
        swiperSlide.innerHTML = `
          <div data-index="${index}" class="img-product">
            <img src="${product.src}" alt="${product.alt}" />
          </div>
          <div data-index="${index}" class="top-product-info">
            <h4 class="top-product-title name-product">${product.alt}</h4>
            <span class="top-product-price price">${product.price}</span>
          </div>
          <button onclick="addToCart();" class="button-product" id="more-btn-2" style="border: 1px solid black; color: black; max-width: 250px; box-sizing: border-box;">
            <a href="#" style="text-decoration: none; color: black;">Thêm vào giỏ hàng</a>
          </button>
        `;
        swiperWrapperTop.appendChild(swiperSlide);
      });

      document
        .querySelectorAll(".img-product, .top-product-info")
        .forEach((item) => {
          item.addEventListener("click", (event) => {
            const procIndex =
              event.target.closest("[data-index]").dataset.index;
            if (procIndex !== undefined) {
              sessionStorage.setItem(
                "pos-index",
                topProducts[parseInt(procIndex)].posIndex
              );
              sessionStorage.setItem(
                "category-product",
                topProducts[parseInt(procIndex)].category
              );
              document.location = "../ChiTietSanPham/chitietsanpham.html";
            } else {
              console.error("Error: data-index attribute not found.");
            }
          });
        });

      initializeSwiper();
    })
    .catch((error) => {
      console.error("Error loading top products:", error);
    });
}

window.addEventListener("load", () => {
  loadHomeProductSwiper();
  loadTopProductSwiper();
});
//swiper review script
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

    //swiper review script
    var swiper = new Swiper(".myReviewSwiper", {
      loop: true,
      navigation: {
        nextEl: ".swiper-button-prev-unique",
        prevEl: ".swiper-button-next-unique",
      },
    });
  });
//swiper news script
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
