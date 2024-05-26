const dialog = document.getElementById("dialog");
function closeDialog() {
  dialog.close();
}
dialog.addEventListener("click", function (event) {
  if (event.target === dialog) {
    closeDialog();
  }
});
