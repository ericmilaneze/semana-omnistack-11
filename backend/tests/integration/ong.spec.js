const request = require('supertest');

const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.migrate.rollback();
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "Teste",
                email: "contato@teste.com.br",
                city: "São Paulo",
                whatsapp: "11965927770",
                uf: "SP"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});
