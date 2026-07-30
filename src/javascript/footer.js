(function () {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  fetch("/src/partials/footer.html")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Falha ao carregar footer (" + response.status + ")");
      }
      return response.text();
    })
    .then(function (html) {
      mount.outerHTML = html;
      document.dispatchEvent(new CustomEvent("site-footer-ready"));
    })
    .catch(function (error) {
      console.error(error);
    });
})();
