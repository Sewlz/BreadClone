fetch("../../data/Product-data/product.json")
  .then((response) => response.json())
  .then((productJson) => {
    var titleHeaderPage = document.querySelectorAll(".breadcrumb_item")[1];
    var title = (titleHeaderPage.innerText = sessionStorage
      .getItem("titlePageWebsite")
      .trim());
    title = title.toLowerCase().trim().replace(/\s/g, "");

    const pageInProduct = document.querySelectorAll(".menu-sub_item a");
    const pageMobileInProduct = document.querySelectorAll(".menu-bar_lv2 a");
    pageInProduct.forEach((item) => {
      addAnRemoveClassActivePage(item);
    });
    pageMobileInProduct.forEach((item) => {
      addAnRemoveClassActivePage(item);
    });

    function addAnRemoveClassActivePage(item) {
      item.classList.remove("active-hover-page");
      if (item.textContent.toLowerCase().trim().replace(/\s/g, "") == title) {
        item.classList.add("active-hover-page");
      }
    }

    const dataProduct = productJson.data;
    const productCategories = Object.keys(dataProduct);
    let dataDetail;
    let categoryProduct;

    productCategories.forEach((item, index) => {
      if (item.includes(title)) {
        categoryProduct = item;
        const dataIndex = Object.values(dataProduct);
        dataDetail = dataIndex[index];
      }
    });

    const objSearch = sessionStorage.getItem("lstSearch");
    if (objSearch) {
      dataDetail = JSON.parse(objSearch);
      titleHeaderPage.innerText = 'Search'
    }

    // Thêm sự kiện beforeunload để xóa mục từ sessionStorage khi thoát trang
    window.addEventListener("beforeunload", () => {
      sessionStorage.removeItem("lstSearch");
    });

    function renderProduct(start, end) {
      const itemCell = document.querySelector(".cell");
      const productGrid = document.querySelector(".product-grid");
      productGrid.innerHTML = "";

      dataDetail.forEach((item, index) => {
        if (index >= start && index < end) {
          const newItem = itemCell.cloneNode(true);

          newItem.setAttribute("pos-index", index);
          const img = newItem.querySelector("img");
          const name = newItem.querySelector(".name-product");
          const price = newItem.querySelector(".price");

          img.src = item.img[0];
          name.innerText = item.name;
          price.innerText = item.price;

          productGrid.appendChild(newItem);
        }
      });
      clickItemProduct();
    }

    //set event click for item product
    function clickItemProduct() {
      const itemCell = document.querySelectorAll(".cell");
      itemCell.forEach((item) => {
        item.addEventListener("click", () => {
          let posIndex = item.getAttribute("pos-index");
          sessionStorage.setItem("pos-index", posIndex);
          sessionStorage.setItem("category-product", categoryProduct);
        });
      });
    }

    const productPerPage = 16; // so san pham xuat hien tren 1 trang
    let currentPage = 1; //trang hien tai
    const totalProduct = dataDetail.length; // tong so san pham
    const totalPages = Math.ceil(totalProduct / productPerPage); // tong so trang
    const inforProduct = document.querySelector(".count-product");
    const titlePage = document.querySelectorAll(".breadcrumb_item")[2];

    function updateDisplay() {
      const start = (currentPage - 1) * productPerPage;
      const end =
        currentPage === totalPages ? totalProduct : start + productPerPage;

      inforProduct.innerText = `Hiển thị ${
        start + 1
      }–${end} của ${totalProduct} kết quả`;
      if (currentPage > 1 && currentPage <= totalPages) {
        titlePage.classList.add("number-page");
        titlePage.innerText = `(trang ${currentPage})`;
      } else if (currentPage == 1) {
        titlePage.classList.remove("number-page");
        titlePage.innerText = "";
      }

      renderProduct(start, end);

      updatePagination();
    }

    const scrollToSortingProduct = () => {
      const sorting = document.querySelector(".sorting-product");
      const menuHeight = document.querySelector(".menu-main").clientHeight;
      sorting.scrollIntoView();
      window.scrollTo({
        top: sorting.offsetTop - menuHeight,
        behavior: "smooth", // Nếu muốn cuộn mượt
      });
    };

    function updatePagination() {
      const screenWidth = window.innerWidth;
      const paginationContainer = document.querySelector(".product-pagination");
      paginationContainer.innerHTML = "";
      const maxPagesToShow = 4;

      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;

        button.addEventListener("click", () => {
          currentPage = i;
          scrollToSortingProduct();
          updateDisplay();
        });

        if (i === currentPage) {
          button.classList.add("active-pagination");
        }

        paginationContainer.appendChild(button);
      }

      if (screenWidth <= 600) {
        const paginations = document.querySelectorAll(
          ".product-pagination button"
        );
        paginations.forEach((item) => {
          item.style.display = "none";
        });
        paginations[currentPage - 1].style.display = "block";
      } else {
        const paginations = document.querySelectorAll(
          ".product-pagination button"
        );

        if (totalPages > maxPagesToShow) {
          paginations.forEach((item) => {
            item.style.display = "none";
          });

          let startPage = currentPage;
          if (currentPage > 1) {
            startPage = currentPage - 1;
          }

          let endPage = startPage + 2;
          if (endPage > totalPages) {
            endPage = totalPages;
          }

          for (let i = startPage; i <= endPage; i++) {
            paginations[i - 1].style.display = "block";
          }

          paginations[totalPages - 1].style.display = "block";

          if (startPage > 2) {
            const ellipsisBefore = document.createElement("span");
            ellipsisBefore.textContent = "...";
            paginationContainer.insertBefore(
              ellipsisBefore,
              paginations[startPage - 2]
            );
            paginations[0].style.display = "block";
            paginations[2].style.display = "block";
          }
          if (endPage < totalPages) {
            if (!(currentPage + 2 == totalPages)) {
              const ellipsisAfter = document.createElement("span");
              ellipsisAfter.textContent = "...";
              paginationContainer.insertBefore(
                ellipsisAfter,
                paginations[endPage]
              );
            }
          }
        }
      }

      const prevButton = document.querySelector(".btn-prev-pagination");
      const nextButton = document.querySelector(".btn-next-pagination");

      prevButton.style.display = currentPage === 1 ? "none" : "block";
      nextButton.style.display = currentPage === totalPages ? "none" : "block";
    }

    window.addEventListener("resize", function () {
      updatePagination();
    });

    document
      .querySelector(".btn-prev-pagination")
      .addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          scrollToSortingProduct();
          updateDisplay();
        }
      });

    document
      .querySelector(".btn-next-pagination")
      .addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          scrollToSortingProduct();
          updateDisplay();
        }
      });

    updateDisplay();
  })
  .catch((error) => console.error("Error importing JSON file:", error));
