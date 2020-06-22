const supertest = require('supertest');
const server = require('./server');
const db = require('./data/dbConfig');
const { expectCt } = require('helmet');


describe('Backend Endpoints', async () => {

    it('should provide status 200', async () => {
        return supertest(server)
            .get('/api/users')
            .then(res => {
                expect(res.status).toBe(201)
            })
    })
})