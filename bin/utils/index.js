"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadRepos = exports.checkYarnInstall = exports.checkCommandInstall = void 0;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const ora_1 = __importDefault(require("ora"));
const chalk_1 = __importDefault(require("chalk"));
const git_clone_1 = __importDefault(require("./git-clone"));
const path_1 = __importDefault(require("path"));
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
function reinitGit(localPath) {
    process.chdir(localPath);
    fs_1.default.rmSync(path_1.default.resolve('./.git'), {
        recursive: true
    });
    child_process_1.execSync('git init');
}
const downloadRepos = (repoObj, localPath, projectName) => {
    const spinner = ora_1.default('Downloading...').start();
    const { url, branch = '' } = repoObj;
    const params = {
        url,
        branch,
        localPath
    };
    const successTemplate = `
✅ Boilerplate download successful

${chalk_1.default.blue('> cd ' + projectName)}

Enjoy yourself!
`;
    git_clone_1.default(params, (err) => {
        if (err === null) {
            reinitGit(localPath);
            spinner.stop();
            console.log(successTemplate);
        }
        else {
            throw err;
        }
    });
};
exports.downloadRepos = downloadRepos;
