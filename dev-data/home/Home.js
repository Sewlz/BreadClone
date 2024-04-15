const images = [
  "./../../public/imgs/sliders/BANH-MOI_THANG-11-06-1920x720.jpg",
  "./../../public/imgs/sliders/BUFFET-LAU-BANG-CHUYEN-WEB-DESKTOP-1920x720.jpg",
  "./../../public/imgs/sliders/CUSTARD-COVER_WEB_DESKTOP-1920x720.jpg",
  "./../../public/imgs/sliders/HAPPY-HOUR_WEB_WEB_DESKTOP-1920x720.jpg",
  "./../../public/imgs/sliders/NEW-BANH_WEB_DESKTOP-copy-1920x720.jpg",
];

const slidesWrapper = document.querySelector(".swiper-wrapper-banner");

images.forEach((imageUrl, index) => {
  const swiperSlide = document.createElement("div");
  swiperSlide.classList.add("swiper-slide");
  swiperSlide.innerHTML = `<img src="${imageUrl}" alt="Image ${index + 1}">`;
  slidesWrapper.appendChild(swiperSlide);
});

// Initialize Swiper
var swiper = new Swiper(".myBannerSwiper", {
  loop: true,
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
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  slidesPerGroup: 3,
  loop: true,
  freeMode: true,
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
    <img src="${product.src}" alt="${product.alt}" onclick="document.location='../ChiTietSanPham/chitietsanpham.html'" />
    <h4 onclick="document.location='../ChiTietSanPham/chitietsanpham.html'">${product.alt}</h4>
    `;
  swiperWrapper.appendChild(swiperSlide);
});

//top product swiper loader
const topProducts = [
  {
    src: "./../../public/imgs/home/topProduct/dsc02401_optimized.png",
    alt: "Buns",
    href: "",
  },
  {
    src: "./../../public/imgs/home/topProduct/dsc02452_optimized.png",
    alt: "Buns",
    href: "",
  },
  {
    src: "./../../public/imgs/home/topProduct/dsc02494_optimized.png",
    alt: "Buns",
    href: "",
  },
  {
    src: "./../../public/imgs/home/topProduct/dsc02621_optimized.png",
    alt: "Buns",
    href: "",
  },
  {
    src: "./../../public/imgs/home/topProduct/dsc02641_optimized.png",
    alt: "Buns",
    href: "",
  },
  {
    src: "./../../public/imgs/home/topProduct/dsc02649_optimized.png",
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
  <img src="${topProducts.src}" alt="${topProducts.alt}" onclick="document.location='../ChiTietSanPham/chitietsanpham.html'" />
  <h4 class="top-product-title" onclick="document.location='../ChiTietSanPham/chitietsanpham.html'">${topProducts.alt}</h4>
  <button class="more-btn" onclick="document.location=''" style="border: 1px solid black; color: black;">Thêm vào giỏ hàng</button>
`;
  swiperWrapperTop.appendChild(swiperSlide);
});

//review
const review = [
  {
    src: "./../../public/imgs/home/customerProfile/profile-1.jpg",
    alt: "Beloved Customer",
    review:
      "Thử vì tiệm gần nhà nhưng dính tới giờ. Nhân viên thân thiện, nhiệt tình, bánh ngon. Tiệm mở rất sớm, sáng ghé mua mang đi làm luôn cũng tiện.",
  },
  {
    src: "./../../public/imgs/home/customerProfile/profile-2.jpg",
    alt: "Buns",
    review:
      "Lâu lâu mấy đứa em lên chơi mà không biết dắt đi đâu là dẫn nó tới tiệm này. Bánh nước giá ok, có chỗ ngồi rộng rãi mà thoải mái nữa.",
  },
  {
    src: "./../../public/imgs/home/customerProfile/profile-3.jpg",
    alt: "Buns",
    review:
      "Cám ơn BreadTalk đã cứu tuiiii. Đợt đó đặt bánh cho công ty mà chỗ đặt đầu tiên xảy ra lỗi, không giao bánh được, cuống cuồng đi kiếm chỗ khác. May có bên này chịu nhận, tui cũng lo quá trời, may người ta ráng tăng ca để xong đơn kịp giao cho tui. Từ đó, tui thành mối đặt bánh ở đây luôn, chỗ lớn người ta làm ăn uy tín, mọi người yên tâm.",
  },
  {
    src: "./../../public/imgs/home/customerProfile/profile-4.jpg",
    alt: "Buns",
    review:
      "Ghiền Fire Floss thật sự. Mình không hảo ngọt mấy, nên chưa thử qua bánh ngọt ở đây nhưng mà cái bánh nhân chà bông ở đây phải nói là đỉnh. Mấy loại bánh mặn khác cũng ok, mà siêu recommend cái bánh Fire Floss này nha. Mới đi xem lại, hình như nó còn là Best Seller của tiệm ><",
  },
];
// JavaScript
const reviewContainer = document.querySelector("#reviewWrapper");

// Function to create a review card
function createReviewCard(review) {
  const card = document.createElement("div");
  card.classList.add("review-card");

  const img = document.createElement("img");
  img.src = review.src;
  img.alt = review.alt;

  const comment = document.createElement("p");
  comment.textContent = review.review;
  comment.classList.add("review-comment");

  card.appendChild(comment);
  card.appendChild(img);

  return card;
}

// Function to initialize reviews
function initializeReviews(reviews) {
  reviews.forEach((review) => {
    const card = createReviewCard(review);
    reviewContainer.appendChild(card);
  });
}

// Call the function to initialize reviews
initializeReviews(review);
