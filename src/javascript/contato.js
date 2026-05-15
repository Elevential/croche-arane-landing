$(document).ready(function() {
    const imgContact = $('.img_contact');

    $('#contact_form').on('submit', async function(e) {
        e.preventDefault();

        const form = $(this);
        const submitBtn = form.find('button[type="submit"]');
        const originalText = submitBtn.text(); 

        const nome = $('#nome').val();
        const email = $('#email').val();
        const mensagem = $('#observacao').val();
        const origem = $('#pagina').val();

        const statusDiv = $('#status_message');

        submitBtn.prop('disabled', true).text('Enviando... ⏳');

        try {
            const response = await fetch('https://api.arane.com.br/api/contato/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ origem, nome, email, mensagem })
            });

            if (response.ok) {
                form.slideUp(200, function() {
                    statusDiv.html(`
                        <div class="status-card success">
                            <p>Mensagem enviada com sucesso! 🎉</p>
                            <button id="voltar_form">Voltar</button>
                        </div>
                    `).css('display', 'flex').hide().fadeIn();
                });
                form.hide();
                imgContact.attr('src', 'src/assets/contato_sucesso.png');
            } else {
                form.slideUp(200, function() {
                    statusDiv.html(`
                        <div class="status-card error">
                            <p>Erro ao enviar mensagem 😕</p>
                            <button id="voltar_form">Voltar</button>
                        </div>
                    `).css('display', 'flex').hide().fadeIn();
                });
                form.hide();
                imgContact.attr('src', 'src/assets/contato_erro.png');
            }
        } catch (error) {
            console.error(error);
            form.slideUp(200, function() {
                statusDiv.html(`
                    <div class="status-card error">
                        <p>Erro de conexão com o servidor 😣</p>
                        <button id="voltar_form">Voltar</button>
                    </div>
                `).css('display', 'flex').hide().fadeIn();
            });
            form.hide();
            imgContact.attr('src', 'src/assets/contato_erro.png');
        } finally {
            submitBtn.prop('disabled', false).text(originalText);
        }
    });

    $(document).on('click', '#voltar_form', function() {
        $('#status_message').fadeOut(function() {
            $(this).html(''); // limpa mensagem
        });
        $('#contact_form')[0].reset(); // limpa todos os campos
        $('#contact_form').fadeIn();
        imgContact.attr('src', 'src/assets/crochet_contact.png');   
    });
});