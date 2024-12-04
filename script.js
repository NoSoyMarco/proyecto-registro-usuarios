const form = document.getElementById('registro-form');
const mensajeDiv = document.getElementById('mensaje');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que se recargue la página al enviar el formulario

    // Captura los datos del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Llamada al backend
        const response = await fetch('http://localhost:3000/', { // Cambia a tu URL base si usas Docker
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            mensajeDiv.innerText = 'Usuario registrado con éxito: ' + data.name;
        } else {
            const error = await response.json();
            mensajeDiv.innerText = 'Error: ' + (error.error || 'No se pudo registrar el usuario');
        }
    } catch (err) {
        mensajeDiv.innerText = 'Error de conexión con el servidor: ' + err.message;
    }
});
