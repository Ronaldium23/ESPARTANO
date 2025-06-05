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

            fetch("https://contacto-backend-gys7.onrender.com/send_email", {
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
    // Tooltip para mapa frontal
const tooltipF = document.getElementById('muscle-name-f');
const frontalAreas = document.querySelectorAll('map[name="mapa-frontal"] area');

frontalAreas.forEach(area => {
    area.addEventListener('mouseover', () => {
        tooltipF.textContent = area.getAttribute('data-name');
        tooltipF.style.display = 'block';
    });

    area.addEventListener('mousemove', (e) => {
        tooltipF.style.left = `${e.pageX + 10}px`;
        tooltipF.style.top = `${e.pageY - 30}px`;
    });

    area.addEventListener('mouseout', () => {
        tooltipF.style.display = 'none';
    });
});

// Tooltip para mapa posterior
const tooltipB = document.getElementById('muscle-name-b');
const backAreas = document.querySelectorAll('map[name="mapa-posterior"] area');

backAreas.forEach(area => {
    area.addEventListener('mouseover', () => {
        tooltipB.textContent = area.getAttribute('data-name');
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
