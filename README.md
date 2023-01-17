# LogicFlow Vue3 应用支持

![GitHub package version](https://img.shields.io/github/package-json/v/han-feng/logicflow-vue?filename=packages%2Fuseapi%2Fpackage.json)
[![npm](https://img.shields.io/npm/v/logicflow-useapi.svg)](https://npm.im/logicflow-useapi)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fhan-feng%2Flogicflow-vue.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fhan-feng%2Flogicflow-vue?ref=badge_shield)

## 子项目
* [useapi](./packages/useapi/README.md)
* [bpmn](./packages/bpmn/README.md)
* [demo](./packages/demo/README.md)

## 开发环境：
本项目使用 pnpm 管理依赖，使用 vite 进行构建打包。

一般步骤：

1. 下载依赖包

   ``` shell
   pnpm i
   ```

2. 开发运行

   ``` shell
   pnpm dev
   ```

3. 编译打包

   ``` shell
   pnpm build
   # 或 清理后重新打包
   pnpm all
   ```

4. 运行打包版本

   ``` shell
   pnpm preview
   ```


> 推荐安装使用 [**ni**](https://github.com/antfu/ni) ，可以根据当前环境自动选择 npm/yarn/pnpm 进行包管理。 **ni** 还提供了方便的 **nr** 命令，可以更轻松地运行 npm 脚本。
>
> **ni** 安装命令
>   ```shell
>   npm install -g @antfu/ni
>   ```
>

## License

[![作者](https://img.shields.io/badge/%E4%BD%9C%E8%80%85-han__feng%40foxmail.com-red.svg?style=social&logo=github)](mailto:han_feng@foxmail.com)
![GitHub](https://img.shields.io/github/license/han-feng/logicflow-vue.svg)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fhan-feng%2Flogicflow-vue.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fhan-feng%2Flogicflow-vue?ref=badge_large)
