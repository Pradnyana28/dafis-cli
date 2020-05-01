import express, { Application } from 'express';

import base from './init';
import errorHandler from './error-handler';
import WebRoute from '@routes/web';

class App {
    public app: Application;

    constructor () {
        this.app = express();
        this.init();
        this.routing();
    }

    private init(): void {

        /**
         * base
         * 
         * This file contain all config need to setup before server is running
         * Connect to MongoDB, Setup CSRF, and all we need
         * To secure this server on the run
         */
        base(this.app);

        /**
         * error-handler.ts
         * 
         * This file contain error handler config
         * We will notif developer whenever error occure on production mode
         * But on development we will only display on console log
         */
        errorHandler(this.app);

    }

    private routing(): void {

        /**
         * routing.ts
         * 
         * This file contain routing base setup
         * Then we server the web via our route
         */
        new WebRoute(this.app);

    }
}

export default new App().app;