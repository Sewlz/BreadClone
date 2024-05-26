document.addEventListener("DOMContentLoaded", function () {
  var leftAnimation = document.getElementById("left-animation");
  var leftAnimationDup = document.getElementById("left-animation-dup");
  var rightAnimation = document.getElementById("right-animation");
  var animationTriggered = false;

  window.addEventListener("scroll", function () {
    if (!animationTriggered && isElementInViewport(leftAnimation)) {
      leftAnimation.style.animation = "left-animation 1s ease forwards";
      animationTriggered = true;
    }
    if (isElementInViewport(rightAnimation)) {
      rightAnimation.style.animation = "right-animation 1s ease forwards";
    }
    if (isElementInViewport(leftAnimationDup)) {
      leftAnimationDup.style.animation = "left-animation-dup 1s ease forwards";
    }
  });
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.bottom > 0 &&
      rect.right > 0 &&
      rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
      rect.top < (window.innerHeight || document.documentElement.clientHeight)
    );
  }
});
