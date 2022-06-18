# LogicFlow Vue3 应用支持

![GitHub package version](https://img.shields.io/github/package-json/v/han-feng/logicflow-vue?filename=packages%2Fuseapi%2Fpackage.json)
[![npm](https://img.shields.io/npm/v/logicflow-useapi.svg)](https://npm.im/logicflow-useapi)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

## 子项目
* [useapi](./packages/useapi/README.md)
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
>> **ni** 自带的 **nrm** 命令可能与 *npm源管理工具* **nrm** 冲突，只要重新安装一次 nrm 即可
>
> **ni** 安装命令
>   ```shell
>   npm install -g @antfu/ni
>   ```
> **nrm** 安装命令
>   ```shell
>   npm install -g Pana/nrm
>   ```
>
