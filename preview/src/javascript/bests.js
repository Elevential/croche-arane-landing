(function () {
  const API_URL = "https://api.arane.com.br/api/estampas/trending/";
  const MAX_ITEMS = 8;

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getItems(payload) {
    if (Array.isArray(payload)) return payload;
    if (payload && Array.isArray(payload.results)) return payload.results;
    return [];
  }

  function renderItems(items) {
    const container = document.getElementById("bests-container");
    if (!container) return;

    const list = items
      .map(function (item) {
        const imageUrl =
          (item.imagem && item.imagem.imagem) ||
          item.imagem_url ||
          "";
        const username =
          (item.usuario && item.usuario.username) ||
          (item.imagem && item.imagem.usuario && item.imagem.usuario.username) ||
          "";

        if (!imageUrl) return "";

        const name = username ? "@" + username : "Arane Crochê";
        return (
          '<article class="best-item">' +
          '<img src="' +
          escapeHtml(imageUrl) +
          '" alt="Estampa de ' +
          escapeHtml(name) +
          '" loading="lazy" referrerpolicy="no-referrer" decoding="async">' +
          '<p class="best-username">' +
          escapeHtml(name) +
          "</p>" +
          "</article>"
        );
      })
      .filter(Boolean)
      .slice(0, MAX_ITEMS)
      .join("");

    if (!list) {
      container.innerHTML =
        '<p class="bests-empty">Ainda não há estampas em alta.</p>';
      return;
    }

    container.innerHTML = list;
  }

  async function loadBests() {
    const container = document.getElementById("bests-container");
    if (!container) return;

    container.innerHTML = '<p class="bests-loading">Carregando estampas…</p>';

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("HTTP " + response.status);
      const data = await response.json();
      renderItems(getItems(data));
    } catch (err) {
      console.error("Falha ao carregar estampas em alta:", err);
      container.innerHTML =
        '<p class="bests-empty">Não foi possível carregar as estampas agora.</p>';
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadBests);
  } else {
    loadBests();
  }
})();
