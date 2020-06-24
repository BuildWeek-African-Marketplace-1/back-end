const request = require('supertest');
const server = require('./server');
const db = require('./data/dbConfig');
// Remember to npm run testmigrate && npm run testseed 
// to get proper data from server


afterEach(async () => {
    await db("users").truncate();
  });

describe('Backend Endpoints', () => {
    describe('GET /', () => {
        it('should return 200 OK', () => {
            return request(server).get('/').then(res => {
                expect(res.status).toBe(200)
            })
        })
    })
    describe('POST /api/auth/register', () => {
        it('Should return status code of 201 after successful register', () => {
            return request(server)
                .post('/api/auth/register')
                .send({
                    first_name: 'Test',
                    last_name: 'Test',
                    email: 'test@test.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK',
                    owner_account: 0
                })
                .set('Accept', 'application/json')
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })
    })
    describe('POST /api/auth/login', () => {
        it('Should return message from invalid login credentials', async () => {
            await request(server)
                .post('/api/auth/register')
                .send({
                    first_name: 'Test',
                    last_name: 'Test',
                    email: 'test@test.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK',
                    owner_account: 0
                })
            const loginResponse = await request(server)
                .post('/api/auth/login')
                .send({
                    email: 'test@test.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK'
                })
                expect(loginResponse.status).toBe(200)
        })
    })
    // ======== ITEMS ==========
    describe('GET /api/items', () => {
        it('expect status 200 from successful call', async () => {
            await request(server)
                .post('/api/auth/register')
                .send({
                    first_name: 'Test',
                    last_name: 'Test',
                    email: 'test@test.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK',
                    owner_account: 0
                })
            const loginResponse = await request(server)
                .post('/api/auth/login')
                .send({
                    email: 'test@test.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK'
                })
                const response = await request(server)
                .get('/api/items')
                .set({Authorization: loginResponse.body.token})
                expect(response.status).toBe(200)
        })
    })
    describe('POST /api/items', () => {
        it('expect status 201 from successfully adding item', async () => {
            await request(server)
                .post('/api/auth/register')
                .send({
                    first_name: 'Test',
                    last_name: 'Test',
                    email: 'test@test.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK',
                    owner_account: 0
                })
            const loginResponse = await request(server)
                .post('/api/auth/login')
                .send({
                    email: 'test@test.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK'
                })
                const response = await request(server)
                .post('/api/items')
                .send({
                    name: 'Test',
                    description: 'Test',
                    price: 25.00,
                    location: 'Cairo, Egypt',
                    user_id: 1
                  })
                .set({Authorization: loginResponse.body.token})
                expect(response.status).toBe(201)
        })
    })
    describe('PUT /api/items/7', () => {
        it('expect status 200 from successfully editing item', async () => {
            await request(server)
                .post('/api/auth/register')
                .send({
                    first_name: 'Test',
                    last_name: 'Test',
                    email: 'test@test.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK',
                    owner_account: 0
                })
            const loginResponse = await request(server)
                .post('/api/auth/login')
                .send({
                    email: 'test@test.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK'
                })
                const response = await request(server)
                .put('/api/items/6')
                .send({
                    name: 'Name Change',
                    description: 'Edited',
                    price: 45.00,
                    location: 'Cairo, Egypt',
                    user_id: 1
                  })
                .set({Authorization: loginResponse.body.token})
                expect(response.status).toBe(200)
        })
    })
    describe('DEL /api/items/8', () => {
        it('expect status 200 from successfully deleting item', async () => {
            await request(server)
                .post('/api/auth/register')
                .send({
                    first_name: 'Test',
                    last_name: 'Test',
                    email: 'test@test.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK',
                    owner_account: 0
                })
            const loginResponse = await request(server)
                .post('/api/auth/login')
                .send({
                    email: 'test@test.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK'
                })
                const response = await request(server)
                .del('/api/items/9')
                .set({Authorization: loginResponse.body.token})
                expect(response.status).toBe(200)
        })
    })
    // ======== USERS ==========
    describe('GET /api/users', () => {
        it('expect status 200 from successful call', async () => {
            await request(server)
                .post('/api/auth/register')
                .send({
                    first_name: 'Test',
                    last_name: 'Test',
                    email: 'test@test.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK',
                    owner_account: 0
                })
            const loginResponse = await request(server)
                .post('/api/auth/login')
                .send({
                    email: 'test@test.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK'
                })
                const response = await request(server)
                .get('/api/users')
                .set({Authorization: loginResponse.body.token})
                expect(response.status).toBe(200)
        })
    })
    describe('PUT /api/users/2', () => {
        it('expect status 200 from successfully editing user', async () => {
            await request(server)
                .post('/api/auth/register')
                .send({
                    first_name: 'Test',
                    last_name: 'Test',
                    email: 'test@test.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK',
                    owner_account: 0
                })
            const loginResponse = await request(server)
                .post('/api/auth/login')
                .send({
                    email: 'test@test.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK'
                })
                const response = await request(server)
                .put('/api/users/1')
                .send({
                    first_name: 'Tested',
                    last_name: 'Tested',
                    email: 'change@change.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK',
                    owner_account: 0
                  })
                .set({Authorization: loginResponse.body.token})
                expect(response.status).toBe(200)
        })
    })
    describe('DEL /api/users/1', () => {
        it('expect status 200 from successfully deleting user', async () => {
            await request(server)
                .post('/api/auth/register')
                .send({
                    first_name: 'Test',
                    last_name: 'Test',
                    email: 'test@test.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK',
                    owner_account: 0
                })
            const loginResponse = await request(server)
                .post('/api/auth/login')
                .send({
                    email: 'test@test.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK'
                })
                const response = await request(server)
                .del('/api/users/1')
                .set({Authorization: loginResponse.body.token})
                expect(response.status).toBe(200)
        })
    })
})

// Endpoints needed to test:
// REGISTER || DONE
// LOGIN || DONE
// / HOME TO VIEW API IS UP || DONE
// ===========ITEMS==========
// GET ITEMS || DONE
// ADD ITEM || DONE
// EDIT ITEM || DONE
// DELETE ITEM || DONE
// ===========USERS==========
// GET USERS || DONE
// EDIT USER || DONE
// DELETE USER || DONE


