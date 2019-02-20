# 使用 Hot Module Replacement(HMR)

首先因為 **react-hot-loader** 依賴於 **babel**，所以要先配置 babel 的部份，然後在安裝 react-hot-loader。

1. 安裝過程中需要用到的 dependencies

```
yarn add -D babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime
yarn add @babel/runtime
yarn add -D react-hot-loader @types/react-hot-loader @hot-loader/react-dom@[react-dom-version]
yarn add -D webpack-dev-server @types/webpack-dev-server
```

2. 然而我繼續使用 awesome-typescript-loader 來轉譯 TS 成 JS。在 webpack 設定檔加入︰

```js
// 節錄：
{
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
          configFileName: "tsconfig.json",
          silent: true,
          useBabel: true,
          babelOptions: {
            babelrc: true,
          },
          babelCore: "@babel/core",
        },
      },
    ]
  }
}
```

3. 修改 **tsconfig.json**，的 **target** 成為較高的版本，例如 **es2017**

4. 新增檔案 **.babelrc**

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["@babel/plugin-transform-runtime", "react-hot-loader/babel"]
}
```

5. 用 **react-hot-loader** 把 **root** 包裹起來：

```js
class App extends React.Component {
  // ...
}

import { hot } from "react-hot-loader/root"
export default hot(App)
```

6. 設定 webpack-dev-server 用的 config：

```js
// 節錄：
{
  devtool: "eval",
    resolve: {
      alias: {
        "react-dom": "@hot-loader/react-dom",
      },
    },
    plugins: [new Webpack.NamedModulesPlugin(), new Webpack.HotModuleReplacementPlugin()],
    devServer: {
      hot: true,
      compress: true,
      open: false,
      host: "localhost",
      port: 3000,
      clientLogLevel: "none",
      historyApiFallback: true,
    },
}
```

7. 啟動 webpack-dev-server 看結果。

## 相關參考

- [react-hot-loader](https://github.com/gaearon/react-hot-loader)
- [@hot-loader/react-dom](https://github.com/hot-loader/react-dom)
- [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/)
