const request = require('supertest');
const server = require('./server');
const db = require('./data/dbConfig');
// const itemsModel = require('./data/models/items-model');


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
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })
    })
    describe('POST /api/auth/login', () => {
        it('Should return message from invalid login credentials', () => {
            return request(server)
                .post('/api/auth/login')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .send({
                    email: 'fail@fail.com',
                    password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK'
                })
                .then(res => {
                    expect(res.body).toHaveProperty('message')
                })
        })
    })
    describe('GET /api/items', () => {
        it('should return error because unauthorized access', () => {
            return request(server)
                .get('/api/users')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })
    })

})

// Endpoints needed to test:
// REGISTER || DONE
// LOGIN
// / HOME TO VIEW API IS UP || DONE
// ===========ITEMS==========
// GET ITEMS || DONE
// ADD ITEM 
// EDIT ITEM
// DELETE ITEM
// ===========USERS==========
// GET USERS
// ADD USER
// EDIT USER
// DELETE USER

// const db = require('./data/dbConfig');
// const server = require('./server');

// const request = require('supertest');
// const userModel = require('./data/models/users-model');

// describe('Endpoint testing', () => {
//     describe('USERS Endpoints', () => {
//         describe('Register User', () => {
//             it('should return the email of new user || REGISTER', async () => {
//                 await db('users').truncate();
//                 let newUser = ({
//                     id: 5,
//                     first_name: 'Zoe',
//                     last_name: 'Eoz',
//                     email: 'zoe@zoe.com',
//                     password: '$2y$08$ISVunLvwR0hF1Ir5ofmbcugJjNGEn3ogp1G6MYHAuG2R8UI/w1vNK',
//                     owner_account: 0
//                 })
//                 let test = await userModel.add(newUser);
//                 expect(test.email).toBe('zoe@zoe.com');
//             })
//             it('should find newUser by id and expect correct first_name', async () => {
//                 let test = await userModel.findById(5);
//                 expect(test.first_name).toBe('Zoe');
//             })
//         })
//     })
// })


