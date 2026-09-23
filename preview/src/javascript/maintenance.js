(function () {
  var config = window.ARANE_SITE_CONFIG || {};
  if (!config.maintenance) return;

  var params = new URLSearchParams(window.location.search);
  var previewParam = params.get("preview");
  var storageKey = "arane_preview_ok";

  if (previewParam && previewParam === config.previewKey) {
    try {
      localStorage.setItem(storageKey, "1");
    } catch (e) {}
    return;
  }

  try {
    if (localStorage.getItem(storageKey) === "1") return;
  } catch (e) {}

  document.documentElement.classList.add("is-maintenance");

  function render() {
    document.body.innerHTML =
      '<main class="maintenance-screen" role="main">' +
      '<img class="maintenance-logo" src="/preview/src/assets/logo.png" alt="Arane Crochê">' +
      "<h1>" +
      escapeHtml(config.maintenanceTitle || "Em manutenção") +
      "</h1>" +
      "<p>" +
      escapeHtml(
        config.maintenanceMessage ||
          "Estamos atualizando o site. Voltamos em breve."
      ) +
      "</p>" +
      '<p class="maintenance-note">Equipe: acesse com <code>?preview=' +
      escapeHtml(config.previewKey || "arane-review") +
      "</code></p>" +
      "</main>";
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
