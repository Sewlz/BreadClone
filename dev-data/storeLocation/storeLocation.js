function changeCountry() {
  // Fetch JSON data from a file
  fetch("../../data/storeLocation-data/storeLocation.json")
    .then((response) => response.json())
    .then((storeLocation) => {
      var selectElement = document.getElementById("citySelect");
      var selectedCity = selectElement.value;
      var cityDataElement = document.getElementById("cityData");
      // Clear previous data in cityDataElement
      cityDataElement.innerHTML = "";
      // Update the country data display
      storeLocation[selectedCity].forEach(function (item, index) {
        var listItem = document.createElement("li");
        listItem.classList.add("cell-content-list");
        listItem.innerHTML = `
            <div class="cell-content-loc" style="margin-bottom: 10px;" onclick="showMap('${item.map}')">
                <div class="cell-name"><b>${item.name}</b></div>
                <div class="location-row">
                    <i class="fa fa-solid fa-location-dot"></i>${item.location}
                </div>
                <div class="cell-row">
                    <i class="fa fa-solid fa-crosshairs"></i>Xem bản đồ
                </div>
                <div class="cell-row">
                    <i class="fa fa-solid fa-phone"></i>${item.phoneNum}
                </div>
                <div class="cell-row">
                    <i class="fa fa-solid fa-envelope"></i>${item.email}
                </div>
                <div class="cell-row">
                    <i class="fa fa-solid fa-clock"></i>${item.work}
                </div>
            </div>
          `;
        if (index === 0) {
          showMap(item.map);
        }
        cityDataElement.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

// Call the function to populate data
changeCountry();

function showMap(mapUrl) {
  var mapDisplay = document.getElementById("display-map");
  mapDisplay.innerHTML = `<iframe src="${mapUrl}" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
}
//list backcolor
const listItems = document.querySelectorAll(".cell-content-loc");
listItems.forEach((item) => {
  item.addEventListener("click", function () {
    // Reset background color of all list items
    listItems.forEach((li) => {
      li.style.backgroundColor = "";
      li.style.color = "";
    });
    // Change background color of clicked list item
    this.style.backgroundColor = "#ffc0cb";
    this.style.color = "white";
  });
});
// swiper - script;
let swiper;
function initializeSwiper() {
  swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    breakpoints: {
      768: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

//location loader
const swiperWrapper = document.getElementById("swiper-wrapper");
fetch("../../data/storeLocation-data/storeLocation.json")
  .then((response) => response.json())
  .then((storeLocation) => {
    storeLocation["HCM"].forEach((loaction) => {
      const swiperSlide = document.createElement("div");
      swiperSlide.classList.add("swiper-slide");
      swiperSlide.innerHTML = `
    <div class="cell">
    <div class="cell-header">
        <p style="display:none">
        ${loaction.map}
        </p>
        <div class="header-id">${loaction.id}</div>
        <div class="header-name"><h2>${loaction.name}</h2></div>
    </div>
    <div class="cell-content">
        <div class="location-row">
        <i class="fa fa-solid fa-location-dot"></i>${loaction.location}
        </div>
        <div class="cell-row">
        <i class="fa fa-solid fa-crosshairs"></i>Xem bản đồ
        </div>
        <div class="cell-row">
        <i class="fa fa-solid fa-phone"></i>${loaction.phoneNum}
        </div>
        <div class="cell-row">
        <i class="fa fa-solid fa-envelope"></i>${loaction.email}
        </div>
        <div class="cell-row">
        <i class="fa fa-solid fa-clock"></i>${loaction.work}
        </div>
    </div>
  </div>
        `;
      swiperSlide.addEventListener("click", function () {
        const paragraphText = this.querySelector("p").textContent;
        getMap(paragraphText);
      });
      swiperWrapper.appendChild(swiperSlide);
    });
    initializeSwiper();
    document
      .querySelector(".swiper-button-next")
      .addEventListener("click", function () {
        swiper.slideNext();
      });

    document
      .querySelector(".swiper-button-prev")
      .addEventListener("click", function () {
        swiper.slidePrev();
      });
  });
//get map at full page
function getMap(mapUrl) {
  console.log("Map URL:", mapUrl); // Log the mapUrl to debug
  const fullPage = document.querySelector("#fullpage");
  fullPage.innerHTML = `
  <div id="iframe-container">
      <iframe src="${mapUrl}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>`;
  fullPage.style.display = "block";
}
