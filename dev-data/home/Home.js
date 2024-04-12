let slideIndex = 0;
const slidesWrapper = document.querySelector(".slides-wrapper");
const slides = document.querySelectorAll(".slider-img");

function showSlide(n) {
  slideIndex = n;
  const offset = -(slideIndex * (slides[0].offsetWidth + 10));
  slidesWrapper.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
  if (slideIndex < slides.length - 1) {
    showSlide(slideIndex + 1);
  }
}

function prevSlide() {
  if (slideIndex > 0) {
    showSlide(slideIndex - 1);
  }
}
