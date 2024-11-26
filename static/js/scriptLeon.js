fetch('/agua-data')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('aguaChart').getContext('2d');

        const labels = data.labels.map(date => {
            const formattedDate = new Date(date);
            return formattedDate.toISOString().split('T')[0];
        });

        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const minDateFormatted = firstDayOfMonth.toISOString().split('T')[0];
        const maxDateFormatted = lastDayOfMonth.toISOString().split('T')[0];

        const filteredData = {
            labels: [],
            values: []
        };

        data.labels.forEach((label, index) => {
            const labelDate = new Date(label).toISOString().split('T')[0];
            if (labelDate >= minDateFormatted && labelDate <= maxDateFormatted) {
                filteredData.labels.push(label);
                filteredData.values.push(data.values[index]);
            }
        });

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: filteredData.labels,
                datasets: [{
                    label: 'Lt de Agua',
                    data: filteredData.values,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cantidad (Litros)'
                        },
                        min: 0,
                        max: 12
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Fecha'
                        },
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'dd'
                            },
                            tooltipFormat: 'yyyy-MM-dd'
                        },
                        min: minDateFormatted,
                        max: maxDateFormatted,
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error:', error));

// Cerrar el modal automáticamente después de enviar el formulario
const form = document.querySelector('form');
form.addEventListener('submit', () => {
    const modal = new bootstrap.Modal(document.getElementById('modalAgregarAgua'));
    modal.hide();
});


fetch('/peso-data')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('pesoChart').getContext('2d');

        const labels = data.labels.map(date => {
            const formattedDate = new Date(date);
            return formattedDate.toISOString().split('T')[0];
        });

        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const minDateFormatted = firstDayOfMonth.toISOString().split('T')[0];
        const maxDateFormatted = lastDayOfMonth.toISOString().split('T')[0];

        const filteredData = {
            labels: [],
            values: []
        };

        data.labels.forEach((label, index) => {
            const labelDate = new Date(label).toISOString().split('T')[0];
            if (labelDate >= minDateFormatted && labelDate <= maxDateFormatted) {
                filteredData.labels.push(label);
                filteredData.values.push(data.values[index]);
            }
        });

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: filteredData.labels,
                datasets: [{
                    label: 'Peso (kg)',
                    data: filteredData.values,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Peso (kg)'
                        },
                        min: 0,
                        max: 150 // Cambia según tu rango esperado
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Fecha'
                        },
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'dd'
                            },
                            tooltipFormat: 'yyyy-MM-dd'
                        },
                        min: minDateFormatted,
                        max: maxDateFormatted,
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error:', error));
