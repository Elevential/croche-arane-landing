(function () {
  const mount = document.getElementById("site-header");
  if (!mount) return;

  fetch("/src/partials/header.html")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Falha ao carregar header (" + response.status + ")");
      }
      return response.text();
    })
    .then(function (html) {
      mount.outerHTML = html;
      document.dispatchEvent(new CustomEvent("site-header-ready"));
    })
    .catch(function (error) {
      console.error(error);
    });
})();
