(function () {
  const API_URL = "https://api.arane.com.br/api/notas-atualizacao";
  let currentPage = 1;

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function markdownToHtml(markdown) {
    const lines = String(markdown || "").replace(/\r\n/g, "\n").split("\n");
    const html = [];
    let inList = false;

    function closeList() {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
    }

    lines.forEach(function (rawLine) {
      const line = rawLine.trim();

      if (!line) {
        closeList();
        return;
      }

      if (/^##\s+/.test(line)) {
        closeList();
        html.push('<h2 class="update-section-title">' + escapeHtml(line.replace(/^##\s+/, "")) + "</h2>");
        return;
      }

      if (/^###\s+/.test(line)) {
        closeList();
        html.push('<h3 class="update-section-subtitle">' + escapeHtml(line.replace(/^###\s+/, "")) + "</h3>");
        return;
      }

      if (/^[-*]\s+/.test(line)) {
        if (!inList) {
          html.push('<ul class="update-list">');
          inList = true;
        }
        html.push("<li>" + escapeHtml(line.replace(/^[-*]\s+/, "")) + "</li>");
        return;
      }

      closeList();
      html.push("<p>" + escapeHtml(line) + "</p>");
    });

    closeList();
    return html.join("");
  }

  function renderNotes(payload) {
    const container = $("#updates-list");
    const status = $("#status");
    const results = payload.results || [];

    container.empty();

    if (!results.length) {
      status.text("Nenhuma atualização encontrada.").removeClass("error");
      $("#updates-pagination").hide();
      return;
    }

    status.text("");

    results.forEach(function (item) {
      const card = $('<article class="update-card"></article>');
      card.append(
        $('<h2 class="update-version"></h2>').text("Versão " + (item.versao || ""))
      );
      card.append(
        $('<div class="update-body"></div>').html(markdownToHtml(item.conteudo))
      );

      if (item.arquivo) {
        card.append(
          $('<a class="update-file" target="_blank" rel="noopener noreferrer"></a>')
            .attr("href", item.arquivo)
            .text("Baixar arquivo da versão")
        );
      }

      container.append(card);
    });

    const latest = results[0];
    if (latest && latest.versao) {
      $("#latest-version").text("Versão " + latest.versao);
    }

    renderPagination(payload);
  }

  function renderPagination(payload) {
    const nav = $("#updates-pagination");
    const pages = Number(payload.pages || 1);
    const page = Number(payload.current_page || 1);

    if (pages <= 1) {
      nav.hide().empty();
      return;
    }

    nav.show().empty();

    const prevBtn = $('<button type="button" class="page-btn">Anterior</button>');
    const nextBtn = $('<button type="button" class="page-btn">Próxima</button>');
    const info = $('<span class="page-info"></span>').text(
      "Página " + page + " de " + pages
    );

    prevBtn.prop("disabled", !payload.previous);
    nextBtn.prop("disabled", !payload.next);

    prevBtn.on("click", function () {
      if (payload.previous) carregarAtualizacoes(page - 1);
    });
    nextBtn.on("click", function () {
      if (payload.next) carregarAtualizacoes(page + 1);
    });

    nav.append(prevBtn, info, nextBtn);
  }

  async function carregarAtualizacoes(page) {
    const status = $("#status");
    currentPage = page || 1;

    status.text("Carregando atualizações...").removeClass("error");

    try {
      const response = await fetch(API_URL + "?page=" + currentPage);

      if (!response.ok) {
        status.text("Erro ao buscar atualizações.").addClass("error");
        return;
      }

      const data = await response.json();
      renderNotes(data);
    } catch (error) {
      console.error(error);
      status.text("Erro de conexão com o servidor.").addClass("error");
    }
  }

  $(document).ready(function () {
    carregarAtualizacoes(1);
  });
})();
