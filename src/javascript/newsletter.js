$(document).ready(function() {
    $('#learn_more_btn').on('click', function(e) {
        e.preventDefault();
        $('#email_modal').fadeIn(200); // efeito suave
        document.getElementById("email_modal").style.display = "flex";
    });
    
    const form = $('#notify_form');
    const submitBtn = $('#submit_btn_newsletter');
    const statusDiv = $('#status_message_newsletter');

    form.on('submit', async function(e) {
        e.preventDefault();

        const email = $('#email_input').val();
        const originalText = submitBtn.text();
        const origem = 'newsletter';

        // Loading no botão
        submitBtn.prop('disabled', true).text('Enviando... ⏳');

        try {
            const response = await fetch('https://api.arane.com.br/api/contato/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, origem })
            });

            if (response.ok) {
                statusDiv.html(`
                    <div class="status-card success">
                        <p>Obrigado! Você será notificado. 🎉</p>
                    </div>
                `).css('display', 'flex').hide().fadeIn();
                form.hide();
            } else {
                statusDiv.html(`
                    <div class="status-card error">
                        <p>Erro ao enviar 😕</p>
                    </div>
                `).css('display', 'flex').hide().fadeIn();
                form.hide();
            }
        } catch (error) {
            console.error(error);
            statusDiv.html(`
                <div class="status-card error">
                    <p>Erro de conexão 😣</p>
                </div>
            `).css('display', 'flex').hide().fadeIn();
            form.hide();
        } finally {
            submitBtn.prop('disabled', false).text(originalText);
        }
    });

    // Botão fechar modal
    $('#email_modal .close').on('click', function() {
        $('#email_modal').fadeOut();
        statusDiv.html('');
        form.show();
        form[0].reset();
    });
});