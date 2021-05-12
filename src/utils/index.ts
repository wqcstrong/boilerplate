import { execSync } from 'child_process';
import clone from 'git-clone';
import ora from 'ora';
import chalk from 'chalk';

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
  'yarn --version',
);

export const downloadRepos = (
  repos: string,
  targetPath: string,
  projectName: string,
) => {
  const spinner = ora('Downloading...').start();
  clone(repos, targetPath, () => {
    spinner.stop();
    console.log(`
✅ Boilerplate download successful

${chalk.blue('> cd ' + projectName)}

Enjoy yourself!
    `);
  });
};
