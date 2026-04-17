$(document).ready(function() {

  async function carregarPrivacidadeTermoUso() {
    const status = $('#status_message');
    const container = $('#faq-container');

    try {
      const response = await fetch('https://api.arane.com.br/api/termo-uso/');

      if (!response.ok) {
        status.text('Erro ao buscar dados 😕');
        return;
      }

      const data = await response.json();

      const doc = data.documentos?.[0];

      if (!doc) {
        status.text('Documento não encontrado 😕');
        return;
      }

      $('#updated_at').text(new Date(data.publicado_em).toLocaleDateString());

      container.html(doc.arquivo);

    } catch (error) {
      status.text('Erro inesperado 😕');
      console.error(error);
    }
  }

  carregarPrivacidadeTermoUso();
});