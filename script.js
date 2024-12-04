const form = document.getElementById('registro-form'); 
const mensajeDiv = document.getElementById('mensaje');

// Definir la URL base (usa la URL pública donde está el frontend)
const API_URL = 'https://nosoymarco.github.io/proyecto-registro-usuarios/api/users'; // Cambiar por la URL pública

// Muestra la URL de la API para verificar
console.log("La URL de la API es:", API_URL);

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que se recargue la página al enviar el formulario

    // Captura los datos del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Muestra los datos del formulario antes de enviarlos
    console.log("Datos enviados:", { name, email, password });

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
            console.log("Respuesta exitosa del servidor:", data); // Muestra la respuesta del servidor
            mensajeDiv.innerText = 'Usuario registrado con éxito: ' + data.name;
        } else {
            // Si no fue exitosa, trata de obtener un error del servidor
            const error = await response.json();
            console.log("Error en la respuesta del servidor:", error); // Muestra el error recibido
            mensajeDiv.innerText = 'Error: ' + (error.error || 'No se pudo registrar el usuario');
        }
    } catch (err) {
        // Captura errores de conexión con el servidor
        console.log("Error en la llamada fetch:", err); // Muestra el error en la consola
        mensajeDiv.innerText = 'Error de conexión con el servidor: ' + err.message;
    }
});

