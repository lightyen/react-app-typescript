# react app typescript

這是一個關於用 typescript 開發 react app 的開箱即用環境範本

### 開發環境準備

<a href="https://code.visualstudio.com">
<img src="https://user-images.githubusercontent.com/49339/32078127-102bbcfe-baa6-11e7-8ab9-b04dcad2035e.png" alt="vscode-img" width="10%"/></a>

<a href="https://nodejs.org">
<img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png" alt="nodejs-img" width="15%"/></a>

<a href="https://yarnpkg.com">
<img src="https://raw.githubusercontent.com/yarnpkg/assets/master/yarn-kitten-full.png" alt="yarn-img" width="15%"/></a>

<a href="https://golang.org/dl">
<img src="https://blog.golang.org/go-brand/Go-Logo/SVG/Go-Logo_Blue.svg" alt="golang-img" width="10%"/></a>
<br />

<img src="https://raw.githubusercontent.com/lightyen/react-app-typescript/master/env.png" />

### 安裝完後檢查環境是否正確運作

```shell
# vscode 版本
code -v
# nodejs 版本
node -v
# npm 版本
npm -v
# yarn 版本
yarn -v
# golang 版本
go version
```

### 安裝 VSCode 擴充元件

- **Debug for Firefox**
- **Debug for Chrome**
- **TSLint**
- **Awesome Typescript Problem Matcher**
- **GitLens**
- _Prettier_
- _Format Files_

### Build 建置

```shell
# 進入專案資料夾
cd <project_name>

# 初始化nodejs project
yarn

# typescript 編譯設定檔
./node_modules/.bin/tsc --project .webpack --outDir .webpack

# webpack 自動化打包編譯
yarn run webpack-development
```

詳細資訊描述在：**.vscode/tasks.json**

### Debug 調試

需要[goexec](https://github.com/shurcooL/goexec)

```shell
go get -u github.com/shurcooL/goexec
```

在建立完應用的 bundle.js 之後

```shell
# run web server
goexec 'http.ListenAndServe(\":9527\", http.FileServer(http.Dir(\"./dist\")))'

# run debug mode browser
firefox http://localhost:9527/ --start-debugger-server
```

在 vscode 中鍵入 `F5` attach 到 browser 進行調試

> Firefox 需要去 **about:debugging** 勾選 **Enable debugging of add-ons** 才可以使用

詳細資訊描述在：**.vscode/tasks.json**

### 依賴性問題

- css-loader@2.x 與 typings-for-css-modules-loader@1.7.0 有衝突，暫不升級

### TSLint 程式碼規範

約定程式碼風格：

- string 字串 以 雙引號 `"` 表示
- statement 除非特例 否則結尾不用分號 `;`
- 原則上仿照 golang

相關設定在**tslint.json**

### editorconfig, prettier 程式碼風格

按 `F1` > `Start Format Files: Workspace` 可以格式化所有的程式碼風格，我偏好縮排為 **4** 個空格

### 其他參考

https://reactjs.org/
https://www.typescriptlang.org/docs/home.html
