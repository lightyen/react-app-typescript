# react app typescript &middot; ![](https://travis-ci.com/lightyen/react-app-typescript.svg?branch=master)![](https://img.shields.io/github/license/lightyen/react-app-typescript.svg)

這是一個用 React 撰寫的環境範本專案，自訂義 Webpack 設定，結合 Typescript, MobX, react-router, Sass 等相關技術，開箱即用。

### 需要的開發環境

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
code -v
node -v
npm -v
yarn -v
go version
```

### 安裝 VSCode 擴充元件

- **Debug for Firefox**
- **Debug for Chrome**
- **TSLint**
- **Awesome Typescript Problem Matcher**
- **Go**
- **GitLens**
- _Prettier_
- _Format Files_
- _EditorConfig for VS Code_

### Build 建置

以下指令皆為 linux 平台，windows 平台路徑注意改成 `\\`

```shell
# clone this repo
git clone https://github.com/lightyen/react-app-typescript

# 進入專案資料夾
cd react-app-typescript

# 初始化
yarn

# typescript 編譯設定檔
./node_modules/.bin/tsc --project .webpack --outDir .webpack

# webpack 自動化打包編譯
yarn run webpack-development
```

詳細資訊描述在：**.vscode/tasks.json**

### Debug 調試

webserver 是我用 golang 撰寫的一個 web server 小程式

在建立完應用的靜態檔案之後

```shell
# run web server
go build -o .webserver/.webserver .webserver/main.go
.webserver/.webserver

# run browser in debug mode
firefox http://localhost:8080/ --start-debugger-server
```

在 vscode 中鍵入 `F5` attach 到 browser 進行調試

> Firefox 需要去 **about:debugging** 勾選 **Enable debugging of add-ons** 才可以使用

詳細資訊描述在：**.vscode/tasks.json**

### 懶人包

<img src="https://raw.githubusercontent.com/lightyen/react-app-typescript/resources/images/00.png"/>
<img src="https://raw.githubusercontent.com/lightyen/react-app-typescript/resources/images/01.png"/>
<img src="https://raw.githubusercontent.com/lightyen/react-app-typescript/resources/images/02.png"/>
<img src="https://raw.githubusercontent.com/lightyen/react-app-typescript/resources/images/03.png"/>

### 依賴性問題

- css-loader@2.x 與 typings-for-css-modules-loader@1.7.0 發現有衝突，暫不升級

### TSLint 程式碼規範

約定程式碼風格：

- string 字串 以 雙引號 `"` 表示
- statement 除非特例 否則結尾不用分號 `;`

相關設定在**tslint.json**

### editorconfig, prettier 程式碼風格

按 `F1` > `Start Format Files: Workspace` 可以格式化所有的程式碼風格

> 我的縮排偏好為 **4** 個空格

### 其他參考筆記

- https://www.youtube.com/watch?v=DLX62G4lc44
- https://reactjs.org/
- https://github.com/enaqx/awesome-react
- https://basarat.gitbooks.io/typescript/content/docs/getting-started.html
- https://www.typescriptlang.org/
- https://basarat.gitbooks.io/typescript/docs/jsx/react.html
