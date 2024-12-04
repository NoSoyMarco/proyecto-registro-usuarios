// backend/config/sequelize.js
const { Sequelize } = require('sequelize');

// Configuración de la base de datos
const sequelize = new Sequelize('registro_usuarios', 'root', 'password', {
    host: 'db', // Cambia esto si tu base de datos está en otro host
    dialect: 'mysql', // Cambia esto según tu base de datos (mysql, postgres, sqlite, etc.)
    logging: false, // Cambia a true si deseas ver las consultas SQL en la consola
});

// Verificar la conexión
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
};

testConnection();

module.exports = sequelize;