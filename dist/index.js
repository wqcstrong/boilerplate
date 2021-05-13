#!/usr/bin/env node
'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const prompts_1 = __importDefault(require('prompts'));
const fs_extra_1 = __importDefault(require('fs-extra'));
const path_1 = __importDefault(require('path'));
const utils_1 = require('./utils');
const repos_1 = require('./repos');
function create() {
  return __awaiter(this, void 0, void 0, function* () {
    const yarnInstalled = utils_1.checkYarnInstall();
    if (!yarnInstalled) {
      console.log('yarn 不存在');
      return;
    }
    const realpath = yield fs_extra_1.default.realpath(process.cwd());
    let isExisted = false;
    let projectName = '';
    let projectPath = '';
    do {
      projectName = yield getProjectName();
      projectPath = path_1.default.join(realpath, projectName);
      isExisted = fs_extra_1.default.pathExistsSync(projectPath);
      if (isExisted === true) {
        console.warn(`${projectName} 文件夹已存在，请重新输入`);
      }
    } while (isExisted === true);
    const projectType = yield getProjectType();
    const repoUrl = repos_1.Boilerplate_Repos[projectType];
    if (!!repoUrl === false) return;
    utils_1.downloadRepos(repoUrl, projectPath, projectName);
  });
}
exports.default = create;
function getProjectName() {
  return __awaiter(this, void 0, void 0, function* () {
    const { projectName = '' } = yield prompts_1.default(
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
    return projectName.trim();
  });
}
function getProjectType() {
  return __awaiter(this, void 0, void 0, function* () {
    const { projectType } = yield prompts_1.default({
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
  });
}
create();
process.on('rejectionHandled', (error) => {
  throw error;
});
