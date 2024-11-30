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
                    label: 'Litros de Agua',
                    data: filteredData.values,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Fondo más suave debajo de la línea
                    borderColor: 'rgba(54, 162, 235, 1)', // Color de la línea
                    borderWidth: 3, // Línea más gruesa
                    pointBackgroundColor: 'rgba(255, 255, 255, 1)', // Fondo de los puntos blanco
                    pointBorderColor: 'rgba(54, 162, 235, 1)', // Borde de los puntos azul
                    pointRadius: 5, // Tamaño del punto
                    tension: 0.4 // Curva suave
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Se adapta al tamaño del contenedor
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#ffffff', // Texto blanco en la leyenda
                            font: {
                                size: 14,
                                family: 'Lora, sans-serif'
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo oscuro del tooltip
                        titleColor: '#ffffff', // Título blanco
                        bodyColor: '#ffffff', // Texto del cuerpo blanco
                        borderColor: 'rgba(54, 162, 235, 1)', // Borde azul del tooltip
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cantidad (Litros)',
                            color: '#ffffff', // Texto blanco del título del eje Y
                            font: {
                                size: 16,
                                family: 'Lora, sans-serif'
                            }
                        },
                        ticks: {
                            color: '#ffffff', // Texto blanco en las marcas
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)', // Líneas sutiles de la cuadrícula
                            lineWidth: 1
                        },
                        min: 0,
                        max: 12
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Fecha',
                            color: '#ffffff', // Texto blanco del título del eje X
                            font: {
                                size: 16,
                                family: 'Lora, sans-serif'
                            }
                        },
                        ticks: {
                            color: '#ffffff', // Texto blanco en las marcas
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)', // Líneas sutiles de la cuadrícula
                            lineWidth: 1
                        },
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'dd' // Día y mes
                            },
                            tooltipFormat: 'dd MMM yyyy' // Tooltip más claro
                        },
                        min: minDateFormatted,
                        max: maxDateFormatted
                    }
                },
                layout: {
                    padding: {
                        top: 20,
                        left: 10,
                        right: 10,
                        bottom: 10
                    }
                },
                animation: {
                    duration: 1200, // Animación suave
                    easing: 'easeOutQuart'
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
                    label: 'Peso',
                    data: filteredData.values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fondo suave bajo la línea
                    borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
                    borderWidth: 3, // Línea más gruesa
                    pointBackgroundColor: 'rgba(255, 255, 255, 1)', // Color del punto
                    pointBorderColor: 'rgba(75, 192, 192, 1)', // Borde del punto
                    pointRadius: 5, // Tamaño de los puntos
                    tension: 0.4 // Suavizar la línea
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Permitir que el gráfico se adapte al tamaño del contenedor
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#ffffff', // Color blanco para el texto de la leyenda
                            font: {
                                size: 14, // Tamaño de fuente más grande
                                family: 'Lora, sans-serif' // Fuente moderna
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro para el tooltip
                        titleColor: '#ffffff', // Texto blanco para el título del tooltip
                        bodyColor: '#ffffff', // Texto blanco para el contenido
                        borderColor: 'rgba(75, 192, 192, 1)', // Borde en el tooltip
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Peso (kg)',
                            color: '#ffffff', // Texto blanco para el título
                            font: {
                                size: 16,
                                family: 'Lora, sans-serif'
                            }
                        },
                        ticks: {
                            color: '#ffffff', // Texto blanco para los valores
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)', // Líneas del grid sutiles
                            lineWidth: 1
                        },
                        min: 0,
                        max: 100
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Fecha',
                            color: '#ffffff', // Texto blanco para el título
                            font: {
                                size: 16,
                                family: 'Lora, sans-serif'
                            }
                        },
                        ticks: {
                            color: '#ffffff', // Texto blanco para los valores
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)', // Líneas del grid sutiles
                            lineWidth: 1
                        },
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'dd' // Formato más amigable de fecha
                            },
                            tooltipFormat: 'dd MMM yyyy' // Tooltip con formato claro
                        },
                        min: minDateFormatted,
                        max: maxDateFormatted
                    }
                },
                layout: {
                    padding: {
                        top: 20,
                        left: 10,
                        right: 10,
                        bottom: 10
                    }
                },
                animation: {
                    duration: 1000, // Animación suave
                    easing: 'easeOutQuart'
                }
            }
        });


    })
    .catch(error => console.error('Error:', error));

fetch('/vinagre-data')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('vinagreChart').getContext('2d');

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
                    label: 'Vinagre',
                    data: filteredData.values,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)', // Fondo suave bajo la línea
                    borderColor: 'rgba(255, 99, 132, 1)', // Color de la línea
                    borderWidth: 3, // Línea más gruesa
                    pointBackgroundColor: 'rgba(255, 255, 255, 1)', // Color del punto
                    pointBorderColor: 'rgba(255, 99, 132, 1)', // Borde del punto
                    pointRadius: 5, // Tamaño de los puntos
                    tension: 0.4 // Suavizar la línea
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Permitir que el gráfico se adapte al tamaño del contenedor
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#ffdddd', // Color rojo claro para el texto de la leyenda
                            font: {
                                size: 14, // Tamaño de fuente más grande
                                family: 'Lora, sans-serif' // Fuente moderna
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(255, 0, 0, 0.7)', // Fondo rojo oscuro para el tooltip
                        titleColor: '#ffffff', // Texto blanco para el título del tooltip
                        bodyColor: '#ffffff', // Texto blanco para el contenido
                        borderColor: 'rgba(255, 99, 132, 1)', // Borde en el tooltip
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'CDA (Cucharadas)',
                            color: '#ffdddd', // Texto rojo claro para el título
                            font: {
                                size: 16,
                                family: 'Lora, sans-serif'
                            }
                        },
                        ticks: {
                            color: '#ffdddd', // Texto rojo claro para los valores
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(255, 99, 132, 0.2)', // Líneas del grid sutiles en rojo
                            lineWidth: 1
                        },
                        min: 0,
                        max: 3
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Fecha',
                            color: '#ffdddd', // Texto rojo claro para el título
                            font: {
                                size: 16,
                                family: 'Lora, sans-serif'
                            }
                        },
                        ticks: {
                            color: '#ffdddd', // Texto rojo claro para los valores
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(255, 99, 132, 0.2)', // Líneas del grid sutiles en rojo
                            lineWidth: 1
                        },
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'dd' // Formato más amigable de fecha
                            },
                            tooltipFormat: 'dd MMM yyyy' // Tooltip con formato claro
                        },
                        min: minDateFormatted,
                        max: maxDateFormatted
                    }
                },
                layout: {
                    padding: {
                        top: 20,
                        left: 10,
                        right: 10,
                        bottom: 10
                    }
                },
                animation: {
                    duration: 1000, // Animación suave
                    easing: 'easeOutQuart'
                }
            }
        });
    })
    .catch(error => console.error('Error:', error));





document.addEventListener('DOMContentLoaded', () => {
    fetch('/progreso')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(progreso => {
            const barraProgreso = document.getElementById('barraProgreso');
            const progresoFinal = progreso.progreso;

            // Animación gradual del texto
            let progresoActual = 0;
            const duracionAnimacion = 2000; // 2 segundos
            const intervalo = 20; // Actualizar cada 20ms

            const animarTexto = setInterval(() => {
                progresoActual += (progresoFinal / (duracionAnimacion / intervalo));

                if (progresoActual >= progresoFinal) {
                    progresoActual = progresoFinal;
                    clearInterval(animarTexto);
                }

                barraProgreso.textContent = `${progresoActual.toFixed(1)}%`;
            }, intervalo);

            // Animar el ancho de la barra con CSS transition
            setTimeout(() => {
                barraProgreso.style.width = `${progresoFinal}%`;
            }, 50); // Pequeño retraso para asegurar que la transición se aplique
        })
        .catch(error => console.error('Error al obtener el progreso:', error));
});
