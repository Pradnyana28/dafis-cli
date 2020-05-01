import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './main';

function parseArgToMake(args) {
    switch (args) {
        case '--p' || '--project':
            return 'project';
        case '--m' || '--model':
            return 'model';
        default:
            return 'project';
    }
}

function parseArgumentsIntoOptions(rawArgs) {
    const argv = {
        '--project': Boolean,
        '--model': Boolean,
        '--install': Boolean,

        // Aliases
        '-p': '--project',
        '-m': '--model',
        '-i': '--install',
    };
    const args = arg(argv, { argv: rawArgs.slice(2), });

    let isProject = true, isModel = false;
    if (args['--model']) isProject = false, isModel = true;

    return {
        key: args._[0],
        object: args._[1],
        installPackages: args['--install'] || false,
        targetDir: process.cwd() + "/" + args._[1],
        template: 'typescript',
        
        isProject: isProject,
        isModel: isModel
    };
}

async function promptForMissingOptions(options) {
    const defaultTemplate = 'TypeScript';
    if (options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate,
        };
    }

    const questions = [];
    // if (!options.template) {
    //   questions.push({
    //     type: 'list',
    //     name: 'template',
    //     message: 'Please choose which project template to use',
    //     choices: ['JavaScript', 'TypeScript'],
    //     default: defaultTemplate,
    //   });
    // }

    if (!options.git) {
        questions.push({
            type: 'confirm',
            name: 'git',
            message: 'Initialize a git repository?',
            default: false,
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        template: options.template || answers.template,
        git: options.git || answers.git,
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    // options = await promptForMissingOptions(options);
    await createProject(options);
}