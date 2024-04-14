const slider = document.querySelector('.slider')
const slides = document.querySelector('.slides')
const slideItem = document.querySelectorAll('.slide-item')
const dotsSlide = document.querySelector('.dots-slide')
const dotWrapper = document.querySelector('.dots-wrapper')

let isDragging = false
let startX
let startScrollLeft
let isMovingSlide = false;
let autoplayIntervalId
const autoPlayTime = 5000;


//Tạo dot-item
for(let i = 0; i <= slideItem.length-4; i++){
    const dotItem = document.createElement('li')
    dotItem.className = 'dot-item'
    dotItem.setAttribute('data-index', i)
    dotsSlide.appendChild(dotItem)
}

const dotItem = document.querySelectorAll('.dot-item')
//Set dot-item đàu tiên
dotItem[0].classList.add('active-dot')

//tạo sự kiện click cho từng dot-item
dotItem.forEach(item => {
    item.addEventListener('click', () => {
        const index = item.getAttribute('data-index')
        removeClassActiveDot()
        item.classList.add('active-dot')

        const dotWidth = dotItem[0].offsetWidth + 15
        var posDotX = -index * dotWidth
        dotWrapper.style.left = `${posDotX}px`

        const targetPosition = slideItem[index].offsetLeft;
        slider.scrollLeft = targetPosition;
    })
})

//xóa class của các dot-item
function removeClassActiveDot(){
    dotItem.forEach(item => {
        item.classList.remove('active-dot')
    })
}

const disableLinks = () => {
    const links = slider.querySelectorAll('a');
    links.forEach(link => {
        link.style.pointerEvents = 'none';
    });
};

const enableLinks = () => {
    const links = slider.querySelectorAll('a');
    links.forEach(link => {
        link.style.pointerEvents = 'auto';
    });
};

const dragStart = (e) => {
    isDragging = true
    slider.classList.add("dragging")
    startX = e.pageX
    startScrollLeft = slider.scrollLeft
}

const dragging = (e) => {
    if(!isDragging) return
    disableLinks()
    slider.scrollLeft = startScrollLeft - (e.pageX - startX)
}

const dragStop = (e) => {
    isDragging = false
    slider.classList.remove("dragging")
    enableLinks()
}

function autoScrollToNearestSlide() {
    if (isMovingSlide) return;
    const currentScrollLeft = slider.scrollLeft;
    const slideItemWidth = slideItem[0].offsetWidth;
    const currentIndex = Math.round(currentScrollLeft / slideItemWidth);

    const targetPosition = slideItem[currentIndex].offsetLeft;
    slider.scrollTo({
        left: targetPosition,
        behavior: 'smooth'
    });

    removeClassActiveDot();
    dotItem[currentIndex].classList.add('active-dot');

    const dotWidth = dotItem[0].offsetWidth + 15;
    const translateDotX = -currentIndex * dotWidth;
    dotWrapper.style.left = `${translateDotX}px`;
}

slider.addEventListener('scroll', () => {
    autoScrollToNearestSlide();
});

function autoMoveToNextSlide() {
    isMovingSlide = true;
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
        behavior: 'smooth'
    });
    
    removeClassActiveDot();
    dotItem[nextIndex].classList.add('active-dot');

    const dotWidth = dotItem[0].offsetWidth + 15;
    const posDotX = -nextIndex * dotWidth;
    dotWrapper.style.left = `${posDotX}px`;
}

function autoPlay(){
    autoplayIntervalId  = setInterval(autoMoveToNextSlide, autoPlayTime)
}

autoPlay()

slider.addEventListener('mousedown', dragStart)
slider.addEventListener('mousemove', dragging)
slider.addEventListener('mouseup', dragStop)
slider.addEventListener('mouseleave', ()=>{
    dragStop
    autoPlay()
})
slider.addEventListener('mouseenter', ()=>{clearTimeout(autoplayIntervalId)})


//code quantityinput
const btnMinus = document.querySelector('.btn-minus')
const btnPlus = document.querySelector('.btn-plus')
const quantityInput = document.querySelector('.quantity')

btnPlus.addEventListener('click', () => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
})

btnMinus.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
});

//code img
Fancybox.bind('[data-fancybox="gallery"]', {
    // Các tùy chọn cấu hình khác nhau của Fancybox
});