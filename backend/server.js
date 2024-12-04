// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete CORS
const sequelize = require('./config/sequelize'); // Asegúrate de que la ruta sea correcta
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Habilita CORS para todas las solicitudes
app.use(bodyParser.json());

// Rutas
app.use('/api/users', userRoutes);

// Exportar la instancia de la aplicación para las pruebas
module.exports = app;

// Sincronizar la base de datos y arrancar el servidor si no está en pruebas
if (process.env.NODE_ENV !== 'test') {
    const startServer = async () => {
        try {
            await sequelize.sync(); // Sincroniza los modelos con la base de datos
            console.log('Base de datos sincronizada');
            
            app.listen(PORT, () => {
                console.log(`Servidor corriendo en http://localhost:${PORT}`);
            });
        } catch (error) {
            console.error('Error al sincronizar la base de datos:', error);
        }
    };

    startServer();
}
