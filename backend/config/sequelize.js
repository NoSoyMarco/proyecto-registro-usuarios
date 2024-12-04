const { Sequelize } = require('sequelize');

const isTestEnvironment = process.env.NODE_ENV === 'test';

// Configuración de Sequelize según el entorno
const sequelize = isTestEnvironment
  ? new Sequelize('sqlite::memory:', { logging: false }) // Base de datos en memoria para pruebas
  : new Sequelize(
      process.env.DB_NAME || 'registro_usuarios', 
      process.env.DB_USER || 'root', 
      process.env.DB_PASSWORD || 'password', 
      {
        host: process.env.DB_HOST || 'db', // Utiliza host de entorno o el valor predeterminado
        dialect: 'mysql', // Cambia esto según tu base de datos
        logging: false, // Cambia a true si deseas ver las consultas SQL
      }
    );

// Verificar la conexión solo si no es un entorno de pruebas
if (!isTestEnvironment) {
  const testConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
      console.error('No se pudo conectar a la base de datos:', error);
    }
  };

  testConnection();
}

module.exports = sequelize;

