import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import chalk from 'chalk';
import compression from 'compression';
import logger from 'morgan';
import session from 'express-session';
import connectMongo from 'connect-mongo';
// import csrf from 'csrf';

import path from 'path';
// const token: csrf = new csrf();
// const secret = token.secretSync();

const init = (app: Application) => {
    const MongoStore = connectMongo(session);
    // global variable
    dotenv.config();
    const DB_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=${process.env.DB_NAME}&readPreference=primary&appname=${process.env.APP_NAME}&ssl=false`;
    // setup express
    app.set('host', '0.0.0.0');
    app.set('env', process.env.NODE_ENV || 'production');
    app.set('port', process.env.APP_PORT || 8080);
    app.set('views', path.join(__dirname, '../resources/views'));
    app.set('view engine', 'pug');
    app.use(express.static('public', { maxAge: '36000' }));
    app.use(express.json());
    app.use(compression());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.APP_KEY,
        cookie: { maxAge: 1209600000 },
        store: new MongoStore({
            url: DB_URI,
            autoReconnect: true,
        })
    }));
    app.disable('x-powered-by');

    // setup headers
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
        next();
    });

    // setup mongoose
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(DB_URI, err => {
        if (err) {
            console.error(err);
            console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
            process.exit();
        }
        console.log('%s Connected to DB\n', chalk.green('✓'));
    });
}

export default init;