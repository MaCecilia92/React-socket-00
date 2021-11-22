//Servidor de express
const express = require('express');

//Servidor de Sockets
const http = require('http');

//Configuraciones de sockets
const socketio = require('socket.io')

const path = require('path');

const Sockets = require('./sockets');

const Cors = require('cors');


class Server {

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;

        //http server
        this.server = http.createServer(this.app);

        //Configuraciones de sockets
        this.io = socketio(this.server, {/*Configuraciones*/});

    }

    middleware() {
        //Desplegar el direcyorio publico 
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        
        //CORS
        this.app.use(cors());
    }

    configSockets() {
        new Sockets(this.io);
    }

    execute() {
        //inicializar middleware
        this.middleware();

        this.configSockets();

        //inicializar server 
        this.server.listen(this.port, () => {
            console.log("Server corriendo en puerto:", this.port);
        });
    }

}

module.exports = Server;