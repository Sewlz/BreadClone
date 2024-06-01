document.addEventListener("DOMContentLoaded", function () {
  const url = sessionStorage.getItem("newsUrl");
  const index = sessionStorage.getItem("newsIndex");
  console.log(url, index);
  fetchData(url, index);
});
function fetchData(url, index) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const newsContainer = document.querySelector(".news-wrapper");

      const newsItem = data.blog[parseInt(index)];
      const newsDiv = document.createElement("div");
      newsDiv.classList.add("news-item");

      const headline = document.createElement("h2");
      headline.textContent = newsItem.headline;
      newsDiv.appendChild(headline);

      const author = document.createElement("p");
      author.textContent = `- By ${newsItem.author} on ${newsItem.date} -`;
      newsDiv.appendChild(author);

      newsItem.paragraph.forEach((paragraph) => {
        if (paragraph.fstPara) {
          const paraContent = document.createElement("p");
          paraContent.textContent = paragraph.fstPara;
          newsDiv.appendChild(paraContent);
        }
        const paraHeader = document.createElement("h3");
        paraHeader.textContent = paragraph.paraHeader;
        newsDiv.appendChild(paraHeader);
        if (paragraph.img) {
          const paraImg = document.createElement("img");
          paraImg.src = paragraph.img;
          newsDiv.appendChild(paraImg);
        }
        if (paragraph.paraContent) {
          const paraContent = document.createElement("p");
          paraContent.textContent = paragraph.paraContent;
          newsDiv.appendChild(paraContent);
        }
        if (paragraph.paraList) {
          const paraList = document.createElement("ul");
          paraList.className = "dynamic-list";
          paraList.style = "list-style: disc !important;";
          paraList.style = "padding-left: 4%";
          paragraph.paraList.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.style = "list-style: disc !important;";
            listItem.textContent = item;
            paraList.appendChild(listItem);
          });
          newsDiv.appendChild(paraList);
        }
      });

      newsContainer.appendChild(newsDiv);

      const header = document.querySelector(".section-header_title");
      header.textContent = newsItem.headline;
      window.document.title = newsItem.headline + " - Dough Re Mi";
    })
    .catch((error) => console.error("Error fetching the JSON:", error));
}
