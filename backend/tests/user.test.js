// tests/user.test.js
const request = require('supertest');
const app = require('../server'); // Asegúrate de que la ruta a tu aplicación sea correcta
const User = require('../models/user'); // Asegúrate de que la ruta a tu modelo sea correcta

// Antes de ejecutar las pruebas, asegúrate de que la base de datos esté limpia
beforeAll(async () => {
    await User.sync({ force: true }); // Esto eliminará y volverá a crear la tabla de usuarios
});

describe('API de Usuarios', () => {
    it('debería crear un nuevo usuario', async () => {
        const response = await request(app)
            .post('/api/users') // Asegúrate de que esta ruta esté definida en tu API
            .send({
                name: 'Juan Pérez',
                email: 'juan.perez@example.com',
                password: 'mi_contraseña'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('debería obtener todos los usuarios', async () => {
        const response = await request(app).get('/api/users'); // Asegúrate de que esta ruta esté definida en tu API
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('debería obtener un usuario por ID', async () => {
        const user = await User.create({
            name: 'Juan Pérez',
            email: 'juan.perez@example.com',
            password: 'mi_contraseña'
        });

        const response = await request(app).get(`/api/users/${user.id}`); // Asegúrate de que esta ruta esté definida en tu API
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
            .put(`/api/users/${user.id}`) // Asegúrate de que esta ruta esté definida en tu API
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

        const response = await request(app).delete(`/api/users/${user.id}`); // Asegúrate de que esta ruta esté definida en tu API
        expect(response.statusCode).toBe(204); // 204 No Content
    });
});