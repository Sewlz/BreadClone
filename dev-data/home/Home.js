//loading slide
const images = [
  "./../../public/imgs/sliders/BANH-MOI_THANG-11-06-1920x720.jpg",
  "./../../public/imgs/sliders/BUFFET-LAU-BANG-CHUYEN-WEB-DESKTOP-1920x720.jpg",
  "./../../public/imgs/sliders/CUSTARD-COVER_WEB_DESKTOP-1920x720.jpg",
  "./../../public/imgs/sliders/HAPPY-HOUR_WEB_WEB_DESKTOP-1920x720.jpg",
  "./../../public/imgs/sliders/NEW-BANH_WEB_DESKTOP-copy-1920x720.jpg",
];

const slides_Wrapper = document.querySelector(".slides-wrapper");

images.forEach((imageUrl, index) => {
  const img = document.createElement("img");
  img.classList.add("slider-img");
  img.src = imageUrl;
  img.alt = `Image ${index + 1}`;
  slides_Wrapper.appendChild(img);
});
// slide scripts
let slideIndex = 0;
const slidesWrapper = document.querySelector(".slides-wrapper");
const slides = document.querySelectorAll(".slider-img");
const slideWidth = slides[0].offsetWidth + 10;

function showSlide(n) {
  slideIndex = n;
  const offset = -(slideIndex * slideWidth);
  slidesWrapper.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
  if (slideIndex < slides.length - 1) {
    showSlide(slideIndex + 1);
  } else {
    // If on the last slide, smoothly transition to the first slide
    slidesWrapper.style.transition = "transform 0.5s ease-in-out";
    showSlide(0);
    // Reset transition after the animation finishes
    setTimeout(() => {
      slidesWrapper.style.transition = "";
    }, 500); // 0.5s transition duration
  }
}

function prevSlide() {
  if (slideIndex > 0) {
    showSlide(slideIndex - 1);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var scrollAnimation = document.getElementById("scrollAnimation");
  var scrollAnimation2 = document.getElementById("scrollAnimation2");
  var decoAnimation = document.getElementById("decoAnimation");
  var decoAnimation2 = document.getElementById("decoAnimation2");
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
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
//product swiper loader
const product = [
  {
    src: "./../../public/imgs/home/productList/dsc02401_optimized.png",
    alt: "Buns",
  },
  {
    src: "./../../public/imgs/home/productList/PUDDING-min-300x300.png",
    alt: "Buns",
  },
  {
    src: "./../../public/imgs/home/productList/Seasonal-Specials-min-300x300.png",
    alt: "Buns",
  },
  {
    src: "./../../public/imgs/home/productList/SLICES-CAKE-min-300x300.png",
    alt: "Buns",
  },
  {
    src: "./../../public/imgs/home/productList/SW-min-300x300.png",
    alt: "Buns",
  },
  {
    src: "./../../public/imgs/home/productList/TOAST-min-300x300.png",
    alt: "Buns",
  },
];

const swiperWrapper = document.getElementById("swiper-wrapper");

product.forEach((product) => {
  const swiperSlide = document.createElement("div");
  swiperSlide.classList.add("swiper-slide");
  swiperSlide.innerHTML = `
    <img src="${product.src}" alt="${product.alt}" />
    <h4>${product.alt}</h4>
    `;
  swiperWrapper.appendChild(swiperSlide);
});
//top product swiper loader
const topProducts = [
  {
    src: "./../../public/imgs/home/productList/dsc02401_optimized.png",
    alt: "Buns",
    href: "",
  },
  {
    src: "./../../public/imgs/home/productList/PUDDING-min-300x300.png",
    alt: "Buns",
    href: "",
  },
  {
    src: "./../../public/imgs/home/productList/Seasonal-Specials-min-300x300.png",
    alt: "Buns",
    href: "",
  },
  {
    src: "./../../public/imgs/home/productList/SLICES-CAKE-min-300x300.png",
    alt: "Buns",
    href: "",
  },
  {
    src: "./../../public/imgs/home/productList/SW-min-300x300.png",
    alt: "Buns",
    href: "",
  },
  {
    src: "./../../public/imgs/home/productList/TOAST-min-300x300.png",
    alt: "Buns",
    href: "",
  },
];
const swiperWrapperTop = document.querySelector(
  "div.swiper:nth-child(4) > div:nth-child(1)"
);

topProducts.forEach((topProducts) => {
  const swiperSlide = document.createElement("div");
  swiperSlide.classList.add("swiper-slide");
  swiperSlide.innerHTML = `
  <img src="${topProducts.src}" alt="${topProducts.alt}" />
  <h4>${topProducts.alt}</h4>
  <button class="more-btn" onclick="document.location='${topProducts.href}'" style="border: 1px solid black; color: black;">Thêm vào giỏ hàng</button>
`;
  swiperWrapperTop.appendChild(swiperSlide);
});
