require('dotenv').config();

const Server = require('./src/models/server')
const server = new Server();

//inicializa el servidor
server.listen();