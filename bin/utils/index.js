"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadRepos = exports.checkYarnInstall = exports.checkCommandInstall = void 0;
const child_process_1 = require("child_process");
const git_clone_1 = __importDefault(require("git-clone"));
const ora_1 = __importDefault(require("ora"));
const chalk_1 = __importDefault(require("chalk"));
const checkCommandInstall = (command) => {
    try {
        child_process_1.execSync(command, { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.checkCommandInstall = checkCommandInstall;
exports.checkYarnInstall = exports.checkCommandInstall.bind(null, 'yarn --version');
const downloadRepos = (repos, targetPath, projectName) => {
    const spinner = ora_1.default('Downloading...').start();
    git_clone_1.default(repos, targetPath, () => {
        spinner.stop();
        console.log(`
✅ Boilerplate download successful

${chalk_1.default.blue('> cd ' + projectName)}

Enjoy yourself!
    `);
    });
};
exports.downloadRepos = downloadRepos;
