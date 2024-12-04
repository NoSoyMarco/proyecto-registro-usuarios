// backend/tests/user.test.js
const request = require('supertest');
const app = require('../server'); // Ruta a tu servidor
const User = require('../models/user'); // Ruta a tu modelo

// Antes de ejecutar las pruebas, limpia la base de datos
beforeAll(async () => {
    await User.sync({ force: true }); // Esto elimina y recrea la tabla de usuarios
});

// Pruebas
describe('API de Usuarios', () => {
    it('debería crear un nuevo usuario', async () => {
        const response = await request(app)
            .post('/api/users') // Ruta de creación de usuario
            .send({
                name: 'Juan Pérez',
                email: 'juan.perez@example.com',
                password: 'mi_contraseña'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('debería obtener todos los usuarios', async () => {
        const response = await request(app).get('/api/users'); // Ruta de obtener todos los usuarios
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('debería obtener un usuario por ID', async () => {
        const user = await User.create({
            name: 'Juan Pérez',
            email: 'juan.perez@example.com',
            password: 'mi_contraseña'
        });

        const response = await request(app).get(`/api/users/${user.id}`); // Ruta de obtener usuario por ID
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', user.id);
    });

    it('debería actualizar un usuario', async () => {
        const user = await User.create({
            name: 'Juan Pérez',
            email: 'juan.perez@example.com',
            password: 'mi_contraseña'
        });

        const response = await request(app)
            .put(`/api/users/${user.id}`) // Ruta de actualización
            .send({
                name: 'Juan Pérez Actualizado',
                email: 'juan.perez.actualizado@example.com',
                password: 'nueva_contraseña'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', user.id);
    });

    it('debería eliminar un usuario', async () => {
        const user = await User.create({
            name: 'Juan Pérez',
            email: 'juan.perez@example.com',
            password: 'mi_contraseña'
        });

        const response = await request(app).delete(`/api/users/${user.id}`); // Ruta de eliminación
        expect(response.statusCode).toBe(204); // Código de éxito al eliminar
    });
});
