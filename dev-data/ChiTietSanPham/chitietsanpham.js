const slider = document.querySelector(".slider");
const slides = document.querySelector(".slides");
const slideItem = document.querySelectorAll(".slide-item");
const dotsSlide = document.querySelector(".dots-slide");
const dotWrapper = document.querySelector(".dots-wrapper");
const root = window.getComputedStyle(document.documentElement);
var numSlides = root.getPropertyValue("--num-slide");

let isDragging = false;
let startX;
let startScrollLeft;
let autoplayIntervalId;
const autoPlayTime = 5000;

//code quantityinput
const btnMinus = document.querySelector(".btn-minus");
const btnPlus = document.querySelector(".btn-plus");
const quantityInput = document.querySelector(".quantity");

btnPlus.addEventListener("click", () => {
  quantityInput.value = parseInt(quantityInput.value) + 1;
});

btnMinus.addEventListener("click", () => {
  const currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
  }
});

// render detail information of product
fetch("../../data/Product-data/product.json")
  .then((res) => res.json())
  .then((productJson) => {
    const imgContainer = document.querySelector(".img-container");
    imgContainer.innerHTML = "";

    const dataProduct = productJson.data;
    const productCategories = Object.keys(dataProduct);
    var dataDetail;

    const categoryProduct = sessionStorage.getItem("category-product");

    productCategories.forEach((item, index) => {
      if (item === categoryProduct) {
        const dataIndex = Object.values(dataProduct);
        dataDetail = dataIndex[index];
      }
    });

    const posItem = sessionStorage.getItem("pos-index");

    const arrayImg = dataDetail[posItem].img;

    const btnNext = document.querySelector(".btn-next");
    const btnPrev = document.querySelector(".btn-prev");
    if (arrayImg.length < 2) {
      btnNext.style = "display: none;";
      btnPrev.style = "display: none;";
    }
    var lstPic = "";
    arrayImg.forEach((item) => {
      var pic = `<img src="${item}" data-fancybox="gallery" title="${dataDetail[posItem].name}">`;
      lstPic += pic;
    });
    imgContainer.innerHTML = lstPic;

    const nameProduct = document.querySelector(".name-product-detail");
    const priceProduct = document.querySelector(".price-product-detail");
    const headerTitle = document.querySelector('.section-header_title')
    document.title = `${dataDetail[posItem].name} - Dough Re Mi`;
    

    nameProduct.innerText = dataDetail[posItem].name;
    priceProduct.innerText = dataDetail[posItem].price;
    headerTitle.innerText = dataDetail[posItem].name

    const imgMain = document.querySelectorAll(".img-container img");
    const imgClone = document.querySelector(".thumbnail-container");
    const clonedImages = [];

    for (let i = 0; i <= imgMain.length; i++) {
      if (imgMain[i]) {
        const clonedImg = imgMain[i].cloneNode(true);
        clonedImg.removeAttribute("data-fancybox");
        clonedImg.setAttribute("data-index", i);
        imgClone.appendChild(clonedImg);
        clonedImages.push(clonedImg);
      }
    }

    clonedImages[0].classList.add("active-img");

    clonedImages.forEach((item) => {
      item.addEventListener("click", () => {
        removeClassImg();
        item.classList.add("active-img");

        var index = parseInt(item.getAttribute("data-index"));
        numImg = index;

        imgClone.scrollLeft = (index - 3) * (item.offsetWidth + 10);
        imgContainer.scrollLeft = index * imgMain[0].offsetWidth;
      });
    });

    function removeClassImg() {
      clonedImages.forEach((item) => {
        item.classList.remove("active-img");
      });
    }

    var numImg = 0;

    btnNext.addEventListener("click", () => {
      if (numImg < clonedImages.length - 1) {
        numImg++;
        removeClassImg();

        if (clonedImages[numImg]) {
          clonedImages[numImg].classList.add("active-img");
          if (numImg > 3) {
            imgClone.scrollLeft =
              (numImg - 3) * (clonedImages[0].offsetWidth + 10);
          }
          imgContainer.scrollLeft = numImg * imgMain[0].offsetWidth;
        } else {
          console.error("Element at numImg", numImg, "is undefined");
        }
      }
    });

    btnPrev.addEventListener("click", () => {
      if (numImg >= 1) {
        numImg--;
        removeClassImg();

        if (clonedImages[numImg]) {
          clonedImages[numImg].classList.add("active-img");
          if (numImg < 4) {
            imgClone.scrollLeft = numImg * (clonedImages[0].offsetWidth + 10);
          }
          imgContainer.scrollLeft = numImg * imgMain[0].offsetWidth;
        } else {
          console.error("Element at numImg", numImg, "is undefined");
        }
      }
    });

    // Add product for slider
    // Function to get random items from all categories
    function getRandomItems(data, totalItems = 11) {
      const allItems = [];
      for (const category in data.data) {
        if (data.data.hasOwnProperty(category)) {
          data.data[category].forEach((item, index) => {
            allItems.push({ ...item, category: category, posIndex: index });
          });
        }
      }
      return shuffleArray(allItems).slice(0, totalItems);
    }

    // Function to shuffle an array
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Get random 10 items from all categories
    const randomItems = getRandomItems(productJson);

    randomItems.forEach((item) => {
      slides.innerHTML += `
      <li class="slide-item">
        <a 
          href="../ChiTietSanPham/chitietsanpham.html"
          pos-index="${item.posIndex}"
          category-product="${item.category}"
          class="img-product">
          <img
            draggable="false"
            src="${item.img[0]}"
            alt="${item.name}"
          />
        </a>
        <div class="content-product">
          <a
            href="../ChiTietSanPham/chitietsanpham.html"
            class="name-product uppercase"
            pos-index="${item.posIndex}"
            category-product="${item.category}"
            >${item.name}</a>
          <span class="price">${item.price}</span>
          <div class="button-product">
            <a href="?#">Thêm vào giỏ hàng</a>
          </div>
        </div>
      </li>`;
    });

    const slideItem = document.querySelectorAll(".slide-item");

    //Tạo dot-item
    for (let i = 0; i <= slideItem.length - numSlides; i++) {
      const dotItem = document.createElement("li");
      dotItem.className = "dot-item";
      dotItem.setAttribute("data-index", i);
      dotsSlide.appendChild(dotItem);
    }

    const dotItem = document.querySelectorAll(".dot-item");
    //Set dot-item đàu tiên
    dotItem[0].classList.add("active-dot");

    //tạo sự kiện click cho từng dot-item
    dotItem.forEach((item) => {
      item.addEventListener("click", () => {
        const index = item.getAttribute("data-index");
        removeClassActiveDot();
        item.classList.add("active-dot");

        const dotWidth = dotItem[0].offsetWidth + 15;
        var posDotX = -index * dotWidth;
        dotWrapper.style.left = `${posDotX}px`;

        const targetPosition = slideItem[index].offsetLeft;
        slider.scrollLeft = targetPosition;
      });
    });

    //xóa class của các dot-item
    function removeClassActiveDot() {
      dotItem.forEach((item) => {
        item.classList.remove("active-dot");
      });
    }

    const disableLinks = () => {
      const links = slider.querySelectorAll("a");
      links.forEach((link) => {
        link.style.pointerEvents = "none";
      });
    };

    const enableLinks = () => {
      const links = slider.querySelectorAll("a");
      links.forEach((link) => {
        link.style.pointerEvents = "auto";
      });
    };

    const dragStart = (e) => {
      isDragging = true;
      slider.classList.add("dragging");
      startX = e.pageX || e.touches[0].pageX;
      startScrollLeft = slider.scrollLeft;
    };

    const dragging = (e) => {
      if (!isDragging) return;
      disableLinks();
      slider.scrollLeft =
        startScrollLeft - ((e.pageX || e.touches[0].pageX) - startX);
      removeClassActiveDot();
      const currentScrollLeft = slider.scrollLeft;
      const slideItemWidth = slideItem[0].offsetWidth;
      const currentIndex = Math.round(currentScrollLeft / slideItemWidth);
      if (currentIndex < dotItem.length) {
        dotItem[currentIndex].classList.add("active-dot");
      }

      const dotWidth = dotItem[0].offsetWidth + 15;
      const posDotX = -currentIndex * dotWidth;
      dotWrapper.style.left = `${posDotX}px`;
    };

    const dragStop = (e) => {
      isDragging = false;
      slider.classList.remove("dragging");
      enableLinks();

      const currentScrollLeft = slider.scrollLeft;
      const slideItemWidth = slideItem[0].offsetWidth;
      const currentIndex = Math.round(currentScrollLeft / slideItemWidth);

      const targetPosition = slideItem[currentIndex].offsetLeft;
      slider.scrollTo({
        left: targetPosition,
        behavior: "smooth",
      });

      if (currentIndex < dotItem.length) {
        removeClassActiveDot();
        dotItem[currentIndex].classList.add("active-dot");
      }

      const dotWidth = dotItem[0].offsetWidth + 15;
      const posDotX = -currentIndex * dotWidth;
      dotWrapper.style.left = `${posDotX}px`;
    };

    function autoMoveToNextSlide() {
      const currentScrollLeft = slider.scrollLeft;
      const slideItemWidth = slideItem[0].offsetWidth;
      const currentIndex = Math.round(currentScrollLeft / slideItemWidth);

      let nextIndex = currentIndex + 1;

      if (nextIndex >= dotItem.length) {
        nextIndex = 0;
      }

      const targetPosition = slideItem[nextIndex].offsetLeft;
      slider.scrollTo({
        left: targetPosition,
        behavior: "smooth",
      });

      removeClassActiveDot();
      dotItem[nextIndex].classList.add("active-dot");

      const dotWidth = dotItem[0].offsetWidth + 15;
      const posDotX = -nextIndex * dotWidth;
      dotWrapper.style.left = `${posDotX}px`;
    }

    function autoPlay() {
      autoplayIntervalId = setInterval(autoMoveToNextSlide, autoPlayTime);
    }

    autoPlay();

    slider.addEventListener("touchstart", dragStart);
    slider.addEventListener("touchmove", dragging);
    slider.addEventListener("touchend", dragStop);
    slider.addEventListener("mousedown", dragStart);
    slider.addEventListener("mousemove", dragging);
    slider.addEventListener("mouseup", dragStop);
    slider.addEventListener("mouseleave", () => {
      dragStop;
      autoPlay();
    });
    slider.addEventListener("mouseenter", () => {
      clearTimeout(autoplayIntervalId);
    });

    const linkItemSlide = document.querySelectorAll(".slide-item a");
    linkItemSlide.forEach((item) => {
      item.addEventListener("click", () => {
        let pos = item.getAttribute("pos-index");
        let category = item.getAttribute("category-product");
        sessionStorage.setItem("pos-index", pos);
        sessionStorage.setItem("category-product", category);
      });
    });
  });
