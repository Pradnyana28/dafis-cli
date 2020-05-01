import chalk from 'chalk';

export interface ILogger {
    info(txt: string, data: any, filename: string): void,
    warning(txt: string, data: any, filename: string): void,
    error(txt: string, data: any, filename: string): void
}

class Logger implements ILogger {
    private getFilename(filename): string {
        let _filename: string = filename || "";
        if (_filename.length > 30) {
            _filename = _filename.substr((_filename.length - 30), _filename.length);
            _filename = __filename.length > 0 ? `...${_filename}` : '';
        }
        return _filename;
    }

    private log(type: string, txt: string, data: any, filename: string, trace: boolean = false): void {
        const _filename = this.getFilename(filename);
        trace ? 
            console.trace('%s %s %s', type, chalk.cyanBright(_filename), txt) :
                console.log('%s %s %s', type, chalk.cyanBright(_filename), txt);
        if (data) {
            console.log('%s Log passed with %s: %o', type, typeof data, data);
        }
    }

    public info(txt: string, data: any, filename: string): void {
        return this.log(chalk.cyan('INFO'), txt, data, filename);
    }

    public warning(txt: string, data: any, filename: string): void {
        return this.log(chalk.yellow('WARNING'), txt, data, filename);
    }

    public error(txt: string, data: any, filename: string): void {
        return this.log(chalk.red('ERROR'), txt, data, filename, true);
    }
}

export default Logger;