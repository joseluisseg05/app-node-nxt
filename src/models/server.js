const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../config/dbMongo');
const db = require('../config/dbSql')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            todo : '/api/v1/todo',
            user : '/api/v1/user'
        }

        //conectar bd
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de aplicacion 
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
        db.sync()
            .then(() => console.log('Base de Datos Mysql Online'))
            .catch(error => console.log(error))
    }

    middlewares(){

        //cors
        var options = {
            origin: '*',// url del servidor donde estara el frond
            optionsSuccessStatus: 200
        }
        this.app.use(cors(options));

        //lectura y parcio
        this.app.use( express.json());

        //directorio publico
        this.app.use(express.static('src/public'));

    }

    routes(){
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.todo, require('../routes/todo'));
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en: ', this.port);
        });
    }
}

module.exports = Server;
