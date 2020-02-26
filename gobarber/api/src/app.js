import express from 'express';
import routes from './routes';

import './database';

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        // Para express utilizar o formato de JSON
        this.server.use(express.json());
    }

    routes() {
        // Passando as rotas para use, pois ela funciona como middlewares tbm
        this.server.use(routes);
    }
}

export default new App().server;
