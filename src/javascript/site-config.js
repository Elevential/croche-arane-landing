/* Configuração rápida do site — altere e faça deploy */
(function () {
  // Produção = experiência completa (antes só em /preview)
  var isPreview = true;

  window.ARANE_SITE_CONFIG = {
    isPreview: isPreview,
    maintenance: false,
    previewKey: "arane-review",
    maintenanceTitle: "Estamos em manutenção",
    maintenanceMessage:
      "O site da Arane Crochê está passando por uma atualização. Voltamos em breve.",
  };

  var root = document.documentElement;
  root.classList.add("is-preview");
  root.classList.remove("is-production");
})();
