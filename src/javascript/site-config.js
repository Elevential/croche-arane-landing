/* Configuração rápida do site — altere e faça deploy */
(function () {
  var path = (window.location && window.location.pathname) || "";
  var params = new URLSearchParams(window.location.search || "");
  var isPreview =
    /^\/preview(\/|$)/.test(path) || params.get("mode") === "preview";

  window.ARANE_SITE_CONFIG = {
    // true quando a URL é /preview/...
    isPreview: isPreview,

    // Emergência: true = visitantes veem tela de manutenção
    maintenance: false,

    // Use /?preview=SEU_CODIGO para ver o site mesmo em manutenção
    previewKey: "arane-review",

    maintenanceTitle: "Estamos em manutenção",
    maintenanceMessage:
      "O site da Arane Crochê está passando por uma atualização. Voltamos em breve.",
  };

  var root = document.documentElement;
  root.classList.toggle("is-preview", isPreview);
  root.classList.toggle("is-production", !isPreview);
})();
