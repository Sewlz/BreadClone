const dialog = document.getElementById("dialog");

fetch("../footer/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;

    const form = document.getElementById("subscriptionForm");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      dialog.showModal();
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        closeDialog();
      }
    });
  })
  .catch((error) => console.error("Error loading footer:", error));

function closeDialog() {
  dialog.close();
}
