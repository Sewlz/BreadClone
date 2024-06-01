document.addEventListener("DOMContentLoaded", function () {
  fetch("../footer/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
      const form = document.getElementById("subscriptionForm");
      const submitInput = document.querySelector(".submit-input");
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        const footerDialog = document.getElementById("dialogFooter");
        footerDialog.showModal();
      });
      const footerDialog = document.getElementById("dialogFooter");
      footerDialog.addEventListener("click", function (event) {
        if (event.target === footerDialog) {
          const footerDialog = document.getElementById("dialogFooter");
          footerDialog.close();
        }
      });
    })
    .catch((error) => console.error("Error loading footer:", error));
});
function showFooterDialog() {
  const footerDialog = document.getElementById("dialogFooter");
  footerDialog.showModal();
}
function closeFooterDialog() {
  const footerDialog = document.getElementById("dialogFooter");
  footerDialog.close();
}
