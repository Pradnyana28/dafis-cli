import { Application } from 'express';
import routeCache from 'route-cache';

import HomeController from '@controllers/Frontend/HomeController/HomeController';

class WebRoute extends HomeController {
    private app: Application;
    private cacheLimit: Number = 216000;
    private cache: any;

    constructor (app: Application) {
        super();
        this.app = app;
        this.cache = routeCache.cacheSeconds(this.cacheLimit);
        this.init();
    }

    public init() {
        this.get();
        this.post();
        this.put();
        this.delete();
    }

    private get(): void {
        this.app.route('/').get(this.cache, this.Index);
        this.app.route('/courses').get(this.cache, this.Course);
        this.app.route('/register').get(this.cache, this.Register);
    }

    private post(): void {

    }

    private put(): void {

    }

    private delete(): void {

    }
}

export default WebRoute;