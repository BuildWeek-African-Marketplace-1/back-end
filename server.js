const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./data/auth/auth-router');
const usersRouter = require('./data/routers/users-router');
const itemsRouter = require('./data/routers/items-router');
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
// server.use('/api/items', itemsRouter);

server.get('/', (req, res) => {
    res.json({ api: "API is running"})
})

module.exports = server;