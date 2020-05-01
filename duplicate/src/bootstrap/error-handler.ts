import { Application } from 'express';
import errorLib from 'errorhandler';

const errorHandler = (app: Application) => {
    if (process.env.NODE_ENV === 'development') {
        // only use in development
        app.use(errorLib());
    } else {
        app.use((err, req, res, next) => {
            console.error(err);
            res.status(500).send('Server Error');
        });
    }
}

export default errorHandler;