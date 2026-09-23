/* Configuração rápida do site — altere e faça deploy */
(function () {
  var path = (window.location && window.location.pathname) || "";
  var search = (window.location && window.location.search) || "";
  var isPreview = false;

  try {
    var params = new URLSearchParams(search);
    isPreview = params.get("mode") === "preview";
  } catch (e) {
    isPreview = /[?&]mode=preview(?:&|$)/.test(search);
  }

  if (!isPreview) {
    isPreview = /\/preview(?:\/|$)/.test(path);
  }

  window.ARANE_SITE_CONFIG = {
    isPreview: isPreview,
    maintenance: false,
    previewKey: "arane-review",
    maintenanceTitle: "Estamos em manutenção",
    maintenanceMessage:
      "O site da Arane Crochê está passando por uma atualização. Voltamos em breve.",
  };

  var root = document.documentElement;
  root.classList.toggle("is-preview", isPreview);
  root.classList.toggle("is-production", !isPreview);
})();
