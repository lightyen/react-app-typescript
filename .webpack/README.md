# webpack

[webpack](https://webpack.js.org/)︰一個 javascript 靜態模塊（module）打包工具。建置過程中會建立依賴圖（dependency graph）來分析模塊之間的相依關係，並且使用豐富的 loader 與 plugin 來建立客製化的 js bundle。

## 使用

1. 安裝 webpack

```sh
yarn add -D webpack @types/webpack webpack-cli
```

2. 撰寫自己的 webpack.config，例如︰

```js
export default {
  output: {
    /** ... */
  },
  module: {
    rule: [
      /** ... */
    ],
  },
  pulgins: [
    /** ... */
  ],
}
```

3. 使用 wepback-cli 開始建構項目

```sh
webpack --config webpack.config
```

> 評語：webpack 真他媽香！
