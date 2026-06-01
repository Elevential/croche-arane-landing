$(document).ready(function() {
  
  // função que carrega as perguntas do backend
  async function carregarPerguntas() {
    const status = $('#status_message');
    const container = $('#faq-container');

    try {
      const response = await fetch('https://api.arane.com.br/api/perguntas-frequentes?origem=contato');

      if (!response.ok) {
        status.text('Erro ao buscar dados 😕');
        return;
      }

      const data = await response.json();
      container.empty(); // limpa o container antes de preencher

      // para cada item, cria o acordeão
      data.forEach(item => {
        const accordion = $('<div>').addClass('accordion');

        const header = $('<button>').addClass('accordion-header');
        header.append($('<span>').text(item.pergunta));
        header.append($('<i>').addClass('fa-solid fa-chevron-down'));

        const body = $('<div>').addClass('accordion-body');
        const respostaComLinks = item.resposta.replace(
          /(https?:\/\/[^\s]+)/g,
          '<a href="$1" target="_blank">$1</a>'
        );

        body.append($('<p>').html(respostaComLinks));
        body.hide(); // inicia fechado

        accordion.append(header, body);
        container.append(accordion);

        // clique para abrir/fechar
        header.on('click', function() {
          $('.accordion-body').not(body).slideUp(200);
          $('.accordion-header i').not($(this).find('i')).removeClass('fa-chevron-up').addClass('fa-chevron-down');
          
          body.slideToggle(200);
          const icon = $(this).find('i');
          icon.toggleClass('fa-chevron-down fa-chevron-up');
        });
      });

      status.text('Perguntas carregadas com sucesso!');

    } catch (error) {
      console.error(error);
      status.text('Erro de conexão com o servidor 😣');
    }
  }

  // chama a função quando a página termina de carregar
  carregarPerguntas();
});