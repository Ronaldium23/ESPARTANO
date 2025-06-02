document.addEventListener('DOMContentLoaded', () => {
    // ----- Envío de formulario de contacto -----
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.classList.add('loading');

            const formData = new FormData(this);

            for (let value of formData.values()) {
                if (!value.trim()) {
                    showFlashMessage('Todos los campos son obligatorios', 'danger');
                    submitButton.classList.remove('loading');
                    return;
                }
            }

            fetch('http://127.0.0.1:5000/send_email', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                showFlashMessage('Mensaje enviado correctamente', 'success');
                this.reset();
                submitButton.classList.remove('loading');
            })
            .catch(error => {
                showFlashMessage('Error al enviar mensaje', 'danger');
                console.error('Error:', error);
                submitButton.classList.remove('loading');
            });
        });
    }

    // ----- Tooltip flotante para nombre de músculo -----
    const tooltip = document.getElementById('muscle-name-f');

    document.querySelectorAll('area').forEach(area => {
        area.addEventListener('mouseover', (e) => {
            const name = area.getAttribute('data-name');
            tooltip.textContent = name;
            tooltip.style.display = 'block';
        });

        area.addEventListener('mousemove', (e) => {
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY - 30}px`;
        });

        area.addEventListener('mouseout', () => {
            tooltip.style.display = 'none';
        });
    });

    // ----- Tooltip flotante para nombre de músculo -----
    const tooltipB = document.getElementById('muscle-name-b');

    document.querySelectorAll('area').forEach(area => {
        area.addEventListener('mouseover', (e) => {
            const name = area.getAttribute('data-name');
            tooltipB.textContent = name;
            tooltipB.style.display = 'block';
        });

        area.addEventListener('mousemove', (e) => {
            tooltipB.style.left = `${e.pageX + 10}px`;
            tooltipB.style.top = `${e.pageY - 30}px`;
        });

        area.addEventListener('mouseout', () => {
            tooltipB.style.display = 'none';
        });
    });
});

// ----- Función para mostrar mensajes flash -----
function showFlashMessage(message, category) {
    const flashContainer = document.getElementById('flash-messages');
    if (!flashContainer) return;

    const flashMessage = document.createElement('div');
    flashMessage.className = `alert ${category}`;
    flashMessage.textContent = message;

    flashContainer.appendChild(flashMessage);

    setTimeout(() => {
        flashMessage.remove();
    }, 5000);
}
