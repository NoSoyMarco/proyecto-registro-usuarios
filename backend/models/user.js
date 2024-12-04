// backend/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Asegúrate de que la ruta sea correcta

const User = sequelize.define('User ', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User;