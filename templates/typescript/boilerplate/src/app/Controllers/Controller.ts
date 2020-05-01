import Logger, { ILogger } from '@utils/logger';

class Controller {
    public logger: ILogger;

    constructor() {
        this.logger = new Logger();
    }
}

export default Controller;