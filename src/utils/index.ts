import { execSync } from 'child_process';
import fs from 'fs';
import ora from 'ora';
import chalk from 'chalk';
import clone from './git-clone';
import path from 'path';

export const checkCommandInstall = (command: string) => {
  try {
    execSync(command, { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
};

export const checkYarnInstall = checkCommandInstall.bind(
  null,
  'yarn --version'
);

function reinitGit(localPath: string) {
  process.chdir(localPath);
  fs.rmSync(path.resolve('./.git'), {
    recursive: true
  });
  execSync('git init');
}

export const downloadRepos = (
  repoObj: I.Repo,
  localPath: string,
  projectName: string
) => {
  const spinner = ora('Downloading...').start();
  const { url, branch = '' } = repoObj;
  const params = {
    url,
    branch,
    localPath
  };
  const successTemplate = `
✅ Boilerplate download successful

${chalk.blue('> cd ' + projectName)}

Enjoy yourself!
`;
  clone(params, (err) => {
    if (err === null) {
      reinitGit(localPath);
      spinner.stop();
      console.log(successTemplate);
    } else {
      throw err;
    }
  });
};
