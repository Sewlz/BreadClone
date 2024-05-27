function showMenu(elementClass) {
  const menu = document.querySelector(`.${elementClass}`);
  menu.classList.toggle("show");
}
function hideMenu(elementClass) {
  const menu = document.querySelector(`.${elementClass}`);
  menu.classList.toggle("hide");
}
function blogTitle(title) {
  event.preventDefault();
  const blog = document.querySelector(`.blog-title h3`);
  blog.innerHTML = title;
  if (title === "Tin tức") {
    parameter = "news";
  } else if (title === "Khuyến mại") {
    parameter = "promotion";
  }
  const newUrl = window.location.pathname + "?" + parameter;
  window.history.pushState({ path: newUrl }, "", newUrl);
  location.reload();
}
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("news")) {
    console.log("Loading news...");
    latestLoader("../../data/blog-data/news.json");
    blogLoader("../../data/blog-data/news.json");
  } else if (urlParams.has("promotion")) {
    console.log("Loading promotion...");
    latestLoader("../../data/blog-data/promotion.json");
    blogLoader("../../data/blog-data/promotion.json");
  } else {
    console.log("Loading default...");
    latestLoader("../../data/blog-data/blog.json");
    blogLoader("../../data/blog-data/blog.json");
  }
});

function latestLoader(fileName) {
  fetch(fileName)
    .then((response) => response.json())
    .then((data) => {
      const blog = data.blog.slice(0, 5);
      const blogWrapper = document.querySelector(".news-list");
      blog.forEach((blogItem) => {
        const blogContent = document.createElement("div");
        blogContent.classList.add("news-container");
        blogContent.onclick = function () {
          window.location.href = "../news/news.html";
        };
        blogContent.innerHTML = `
      <div class="news-wrapper">
      <div class="news-image">
        <img
          src="${blogItem.src}"
          alt="News Image"
        />
      </div>
      <div class="news-content-wrapper">
        <div class="news-headline">
          <span style="color: #5ba9e6"
            > ${blogItem.headline}</span
          >
        </div>
        <div class="news-author">
          <span>Người viết: ${blogItem.author}</span>
          <span>${blogItem.date}</span>
        </div>
      </div>
    </div>
      `;
        blogWrapper.appendChild(blogContent);
      });
    })
    .catch((error) => console.error("Error fetching blog data:", error));
}
function blogLoader(fileName) {
  fetch(fileName)
    .then((response) => response.json())
    .then((data) => {
      const blog = data.blog;
      const blogWrapper = document.querySelector(".blog-list");
      blog.forEach((blogItem) => {
        const blogContent = document.createElement("div");
        blogContent.classList.add("blog-container");
        blogContent.onclick = function () {
          window.location.href = "../news/news.html";
        };
        blogContent.innerHTML = `
        <div class="blog-image">
          <img src="${blogItem.src}" alt="Blog Image">
        </div>
        <div class="blog-content-wrapper">
          <div class="a-row"></div>
          <div class="blog-headline">
            <span style="color: #5ba9e6">${blogItem.headline}</span>
          </div>
          <div class="blog-author">
            <span class="author">Người viết: ${blogItem.author}</span>
            <span class="date">${blogItem.date}</span>
          </div>
          <div class="blog-content">
            <span>${blogItem.content}</span>
          </div>
        </div>
      `;
        blogWrapper.appendChild(blogContent);
      });

      const itemsPerPage = 5; // Number of items to display per page
      const blogContainers = document.querySelectorAll(".blog-container");
      const totalPages = Math.ceil(blogContainers.length / itemsPerPage); // Calculate total pages

      // Function to display items based on page number
      function displayItems(pageNumber) {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        blogContainers.forEach((blog, index) => {
          if (index >= startIndex && index < endIndex) {
            blog.style.display = "flex";
          } else {
            blog.style.display = "none";
          }
        });
      }

      // Display the first page initially
      displayItems(1);

      // Pagination
      const pagination = document.querySelector(".pagination");

      for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;

        pageLink.addEventListener("click", function (event) {
          event.preventDefault();
          const pageNumber = parseInt(event.target.textContent);
          displayItems(pageNumber);
          updatePagination(pageNumber); // Update active pagination link
        });

        pagination.appendChild(pageLink);

        // Set first page link as active
        if (i === 1) {
          pageLink.classList.add("active");
        }
      }

      // Add "Next" arrow and functionality
      const nextLink = document.createElement("a");
      nextLink.href = "#";
      nextLink.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`;

      nextLink.addEventListener("click", function (event) {
        event.preventDefault();
        const currentPage = parseInt(
          document.querySelector(".pagination .active").textContent
        );
        const nextPage = currentPage === totalPages ? 1 : currentPage + 1;
        displayItems(nextPage);
        updatePagination(nextPage); // Update active pagination link
      });

      pagination.appendChild(nextLink);

      // Function to update active pagination link
      function updatePagination(pageNumber) {
        const pageLinks = document.querySelectorAll(".pagination a");
        pageLinks.forEach((link) => {
          link.classList.remove("active");
          if (parseInt(link.textContent) === pageNumber) {
            link.classList.add("active");
          }
        });
      }
    })
    .catch((error) => console.error("Error fetching blog data:", error));
}
