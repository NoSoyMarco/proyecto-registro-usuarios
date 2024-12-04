const form = document.getElementById('registro-form');
const mensajeDiv = document.getElementById('mensaje');

// Definir la URL base (usa el nombre del servicio backend en Docker)
const API_URL = 'http://backend:3000/api/users'; // Cambiar localhost por backend

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que se recargue la página al enviar el formulario

    // Captura los datos del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Llamada al backend para registrar al usuario
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        // Verifica si la respuesta fue exitosa
        if (response.ok) {
            const data = await response.json();
            mensajeDiv.innerText = 'Usuario registrado con éxito: ' + data.name;
        } else {
            // Si no fue exitosa, trata de obtener un error del servidor
            const error = await response.json();
            mensajeDiv.innerText = 'Error: ' + (error.error || 'No se pudo registrar el usuario');
        }
    } catch (err) {
        // Captura errores de conexión con el servidor
        mensajeDiv.innerText = 'Error de conexión con el servidor: ' + err.message;
    }
});
