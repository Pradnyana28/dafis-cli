import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';
import ejs from 'ejs';
// import execa from 'execa';
// import ncp from 'ncp';

const access = promisify(fs.access);
// const copy = promisify(ncp);

const SKIP_FILES = ['node_modules'];

async function createDir(dirPath) {
    return await fs.mkdirSync(dirPath, { recursive: true });
}

async function render(content, data) {
    return await ejs.render(content, data);
}

async function createDirectoryContents(templateDirectory, objectName, options) {
    const filesToCreate = fs.readdirSync(templateDirectory);
    filesToCreate.forEach(async file => {
        const origFilePath = path.join(templateDirectory, file);
        const stats = fs.statSync(origFilePath);
    
        // skip files that should not be copied
        if (SKIP_FILES.indexOf(file) > -1) return;
        
        if (stats.isFile()) {
            // read file content and transform it using template engine
            let contents = fs.readFileSync(origFilePath, 'utf8');
            contents = await render(contents, { projectName: options.object });
            // write file to destination folder
            const writePath = path.join(process.cwd(), objectName, file);
            fs.writeFileSync(writePath, contents, 'utf8');
        } else if (stats.isDirectory()) {
            const dirName = path.join(process.cwd(), objectName, file);
            try {
                await createDir(dirName);
            } catch (err) {
                console.error('%s Could not create directory %s', chalk.red.bold('ERROR'), file);
                process.exit(1);
            }
            createDirectoryContents(path.join(templateDirectory, file), path.join(objectName, file), options);
        }
    });
}

async function createDirByName(string, basePath) {
    if (!fs.existsSync(path.join(process.cwd(), basePath))) {
        console.error('Base path is not exists, is the project correctly installed ?')
        process.exit(1);
    }
    let pathToCreate = string.split('/');
    const fileName = pathToCreate.slice(pathToCreate.length - 1, pathToCreate.length)[0];
    pathToCreate = pathToCreate.slice(0, pathToCreate.length - 1);
    let currentPath = basePath;
    await pathToCreate.forEach( p => {
        const joinPath = path.join(currentPath, p);
        if (!fs.existsSync(joinPath)) {
            createDir(joinPath);
        }
        currentPath += "/" + p;
    });
    return {
        origPath: pathToCreate.join('/'),
        fullPath: path.join(basePath, pathToCreate.join('/')),
        fileName: fileName
    };
}

async function duplicateTemplateFile(templateDirectory, options) {
    // things to replace
    // modelName, modelNameLowercase
    const filesToDuplicate = fs.readdirSync(templateDirectory);
    filesToDuplicate.forEach(async file => {
        const origFilePath = path.join(templateDirectory, file);
        const stats = fs.statSync(origFilePath);
        
        if (stats.isFile()) {
            // read file content and transform it using template engine
            let contents = fs.readFileSync(origFilePath, 'utf8');
            contents = await render(contents, { 
                modelName: options.object, 
                modelNameLowercase: options.object.toLowerCase(),
                modulePath: options.modulePath
            });
            // write file to destination folder
            const fileName = file.replace(options.replace, options.replaceWith);
            const writePath = path.join(options.targetDirectory, fileName);
            fs.writeFileSync(writePath, contents, 'utf8');
        } else {
            console.error('File $s currently is not support to duplicate.', file);
            process.exit(1);
        }
    });
}

async function copyTemplateFiles(options) {
    let templateDirectory = options.templateDirectory;

    if (options.isProject) {
        try {
            await createDir(options.targetDir);
        } catch (err) {
            console.error('%s Could not create directory', chalk.red.bold('ERROR'));
            process.exit(1);
        }

        templateDirectory = path.join(templateDirectory, 'boilerplate');
        return await createDirectoryContents(templateDirectory, options.object, options);
    };

    if (options.isModel) {
        templateDirectory = path.join(templateDirectory, 'model');
        try {
            const { origPath, fullPath, fileName } = await createDirByName(options.object, 'src/app/Models');
            options.fileName = fileName;
            options.targetDirectory = path.join(process.cwd(), fullPath);
            options.modulePath = origPath;
            options.object = fileName;
            options.replace = 'Temp';
            options.replaceWith = fileName;
        } catch (err) {
            console.error('%s Could not create directory', chalk.red.bold('ERROR'));
            process.exit(1);
        }
        return await duplicateTemplateFile(templateDirectory, options);
    }
}

// async function initGit(options) {
//     const result = await execa('git', ['init'], {
//         cwd: options.targetDirectory,
//     });
//     if (result.failed) {
//         return Promise.reject(new Error('Failed to initialize git'));
//     }
//     return;
// }

export async function createProject(options) {
    options = {
        ...options,
        targetDirectory: options.targetDir || process.cwd(),
    };

    const currentFileUrl = __dirname;
    const templateDir = path.resolve(
        new URL(currentFileUrl).pathname,
        '../templates',
        options.template.toLowerCase()
    );
    options.templateDirectory = templateDir;

    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (err) {
        console.error('%s Invalid template name', chalk.red.bold('ERROR'));
        process.exit(1);
    }

    const taskLists = [{
        title: 'Copying template files',
        task: () => copyTemplateFiles(options),
    }];
    if (options.isProject) {
        taskLists.push({
            title: 'Installing dependencies',
            task: () =>
                projectInstall({
                    cwd: options.targetDirectory,
                }),
            skip: () =>
                !options.installPackages
                    ? 'Pass --install or -i to automatically install dependencies'
                    : undefined,
        });
    }

    await new Listr(taskLists).run();
    return true;
}