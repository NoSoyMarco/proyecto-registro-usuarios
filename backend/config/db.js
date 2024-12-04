const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'password',  // Asegúrate de que esta sea la contraseña correcta
    database: 'registro_usuarios'
});

// Función para intentar la conexión con reintentos
function connectWithRetry() {
    db.connect((err) => {
        if (err) {
            console.error('Error conectando a la base de datos, reintentando en 5 segundos...', err);
            // Solo reintentar si no es un error fatal
            if (err.code !== 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
                setTimeout(connectWithRetry, 5000); // Reintentar cada 5 segundos
            } else {
                console.error('Error fatal, no se puede reconectar.');
            }
        } else {
            console.log('Conectado a la base de datos!');
        }
    });
}

// Llamar a la función para iniciar la conexión
connectWithRetry();

module.exports = db;