## 创建项目模板脚手架

### 分支说明

- main：脚手架
- [其他分支]：分支名与模板类型一一对应

### 使用说明

```bash
yarn create @blucass/project

// 根据问题，输入参数
```

所生成的模板都已经内置以下功能：

- 中台标准基本布局
- 声明式路由配置
- 接口请求
- `ts/js` 混合开发
- 三方依赖优化（如 `antd` 的按需加载配置, 同时还会用 `dayjs` 替换掉 `moment`）
- 支持使用 less
- 支持引用 svg 作为 react 组件
- ......

### 模板类型

- react-lite-pc: 基于 `create-react-app` 二次开发、内置通用模块的轻量模板，没有 eject 配置；
- react-vite-pc: 基于 `Vite` 构建
