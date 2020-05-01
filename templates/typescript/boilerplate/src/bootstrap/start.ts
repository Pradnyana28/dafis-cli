import { Application } from 'express';
import chalk from 'chalk';

const start = (app: Application) => {
    app.listen(app.get('port'), () => {
        console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    });
}

export default start;