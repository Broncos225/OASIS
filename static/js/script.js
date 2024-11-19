document.querySelectorAll('.hercules-card').forEach(card => {
    card.addEventListener('click', function () {
        // Agrega la clase de expansión
        this.classList.add('expanding');

        // Opcional: Redirige después de la animación
        setTimeout(() => {
            const destination = this.getAttribute('data-url') || '#';
            window.location.href = destination;
        }, 500); // Tiempo igual al de la animación CSS
    });
});
