document.querySelectorAll(".heading-title").forEach((item) => {
  const titleHeadingPage = item.textContent.trim();
  const titleHeadingPageFormatted =
    titleHeadingPage.charAt(0).toUpperCase() +
    titleHeadingPage.slice(1).toLowerCase();
  const textItem = titleHeadingPageFormatted.toLowerCase().replace(/\s/g, "");

  document
    .querySelectorAll(`#section-${textItem} .btn-view-more a`)
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        sessionStorage.setItem("titlePageWebsite", titleHeadingPageFormatted);
        sessionStorage.setItem("category-product", textItem);
      });
    });
});

fetch("../../data/Product-data/product.json")
  .then((res) => res.json())
  .then((data) => {
    // Hàm để lấy 8 đối tượng đầu tiên từ mỗi danh mục
    function getFirst8Items(data) {
      const result = [];
      for (let category in data) {
        if (data.hasOwnProperty(category)) {
          result.push({
            category: category,
            items: data[category].slice(0, 8),
          });
        }
      }
      return result;
    }

    const first8Items = getFirst8Items(data.data);

    const productContentArray = [];

    document.querySelectorAll(".heading-title").forEach((item, index) => {
      const textItem = item.textContent.trim().toLowerCase().replace(/\s/g, "");

      const categoryData = first8Items.find(
        (category) => category.category === textItem
      );

      if (categoryData) {
        productContentArray.push(categoryData);
      }
    });

    let productGrid = document.querySelectorAll(`.product-grid`);
    productGrid.forEach((item, index) => {
      const category = productContentArray[index];
      if (category) {
        item.innerHTML = "";
        category.items.forEach((product, index) => {
          console.log(product.img[0]);
          item.innerHTML += `<div class="cell">
            <a href="../ChiTietSanPham/chitietsanpham.html" pos-index="${index}" category-product="${category.category}" class="img-product">
              <img src="${product.img[0]}" alt="${product.name}" />
            </a>
            <div class="content-product">
              <a href="../ChiTietSanPham/chitietsanpham.html" category-product="${category.category}"
              pos-index="${index}" class="name-product uppercase">${product.name}</a>
              <span class="price">${product.price}</span>
              <div class="button-product">
                <a href="?#">Thêm vào giỏ hàng</a>
              </div>
            </div>
          </div>`;
        });
      }
    });
    const cellProduct = document.querySelectorAll(".cell a");
    cellProduct.forEach((item) => {
      item.addEventListener("click", () => {
        let posIndex = item.getAttribute("pos-index");
        let category = item.getAttribute("category-product");

        sessionStorage.setItem('pos-index', posIndex)
        sessionStorage.setItem('category-product', category)
      });
    });
  })
  .catch((e) => console.error("Error importing JSON file:", e));

const categoriesItems = document.querySelectorAll(".categories_item a");

categoriesItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
