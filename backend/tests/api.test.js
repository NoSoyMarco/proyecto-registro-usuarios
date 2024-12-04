const request = require('supertest');
const app = require('../server'); // Asegúrate de importar tu aplicación Express

describe('POST /api/users', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'password123',
            })
            .expect(201); // Esperamos un código 201 (creado)

        expect(response.body.name).toBe('Test User');
        expect(response.body.email).toBe('testuser@example.com');
    });
});
