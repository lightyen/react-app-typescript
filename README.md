# react app typescript &middot; ![](https://travis-ci.com/lightyen/react-app-typescript.svg?branch=master)![](https://img.shields.io/github/license/lightyen/react-app-typescript.svg)

這是一個我學習 typescript & react 用的開發環境範本，使用自訂義的 [webpack](https://webpack.js.org/) 設定，結合 redux, react-router, sass, jest 等相關技術鏈。（不定期更新）

## 安裝以下開發環境

<a href="https://code.visualstudio.com">
<img src="https://user-images.githubusercontent.com/49339/32078127-102bbcfe-baa6-11e7-8ab9-b04dcad2035e.png" alt="vscode-img" width="10%"/></a>

<a href="https://nodejs.org">
<img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png" alt="nodejs-img" width="15%"/></a>

<a href="https://yarnpkg.com">
<img src="https://raw.githubusercontent.com/yarnpkg/assets/master/yarn-kitten-full.png" alt="yarn-img" width="15%"/></a>

---

![預覽圖](https://raw.githubusercontent.com/lightyen/react-app-typescript/resources/images/env.png)

#### 安裝完後檢查環境是否正確運作

```shell
code -v
node -v
yarn -v
```

#### 安裝相關 Visual Studio Code 擴充元件

- [**ESLint**](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [**Debug for Firefox**](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-firefox-debug)
- [**Debug for Chrome**](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
- [_Prettier_](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [_Format Files_](https://marketplace.visualstudio.com/items?itemName=jbockle.jbockle-format-files)
- [_EditorConfig for VS Code_](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

#### 其他我常用的

- [**GitLens**](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
- [Fira Code](https://github.com/tonsky/FiraCode) (字型)

### Build 建置

```shell
# clone this repo
git clone https://github.com/lightyen/react-app-typescript.git

# 進入專案資料夾
cd react-app-typescript

# 檢查或下載 dependencies
yarn

# 執行
yarn start

# or 建置 production
yarn build

# 測試
yarn test
```

### Debug

直接在瀏覽器使用開發者工具(F12)

## 懶人包

![02.png](https://raw.githubusercontent.com/lightyen/react-app-typescript/resources/images/02.png)

![03.png](https://raw.githubusercontent.com/lightyen/react-app-typescript/resources/images/dev.png)

## 程式碼風格

約定程式碼風格：

- string 以雙引號 `"` 表示
- statement 除非特例，否則結尾不使用分號 `;`
- 縮排 **4** 個空格

#### editorconfig, prettier 程式碼風格

按 `F1` > `Start Format Files: Workspace` 可以格式化所有的程式碼風格

> 不喜歡我風格的朋友可以自行修改 **.editorconfig**, **.prettierrc**, **.eslintrc** 等檔案

## 其他知識參考

- https://reactjs.org/
- https://www.typescriptlang.org/

- [React Beginners Tutorial](https://www.youtube.com/watch?v=DLX62G4lc44)
- [Getting Started With TypeScript](https://basarat.gitbooks.io/typescript/content/docs/getting-started.html)
- [React With TypeScript](https://basarat.gitbooks.io/typescript/docs/jsx/react.html)
- [React Hook](https://www.youtube.com/watch?v=wXLf18DsV-I)
- [Awesome](https://github.com/enaqx/awesome-react)

## broswerlist

- https://browserl.ist/
