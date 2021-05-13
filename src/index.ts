import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';

import { checkYarnInstall, downloadRepos } from './utils';
import { Boilerplate_Repos } from './repos';

export default async function create() {
  const yarnInstalled = checkYarnInstall();

  if (!yarnInstalled) {
    console.log('yarn 不存在');
    return;
  }
  const realpath = await fs.realpath(process.cwd());

  let isExisted = false;
  let projectName = '';
  let projectPath = '';
  do {
    projectName = await getProjectName();
    projectPath = path.join(realpath, projectName);
    isExisted = fs.pathExistsSync(projectPath);
    if (isExisted === true) {
      console.warn(`${projectName} 文件夹已存在，请重新输入`);
    }
  } while (isExisted === true);

  const projectType = await getProjectType();
  type BoilerplateType = keyof typeof Boilerplate_Repos;
  const repoUrl = Boilerplate_Repos[projectType as BoilerplateType];

  if (!!repoUrl === false) return;
  downloadRepos(repoUrl, projectPath, projectName);
}

async function getProjectName() {
  const { projectName = '' } = await prompts(
    {
      type: 'text',
      name: 'projectName',
      message: '项目名称'
    },
    {
      onCancel: () => true
    }
  );
  if (projectName.trim() === '') {
    process.exit();
  }
  return (projectName as string).trim();
}

async function getProjectType() {
  const { projectType } = await prompts({
    type: 'select',
    name: 'projectType',
    message: '选择项目模板',
    choices: [
      {
        title: 'React Lite for PC',
        value: 'react-lite-pc',
        description: '基于 create-react-app，支持自定义配置'
      }
    ]
  });
  return projectType;
}

create();

process.on('rejectionHandled', (error) => {
  throw error;
});
