# 一些筆記

## 使用 Hot Module Replacement(HMR)

首先因為 **react-hot-loader** 依賴於 **babel**，所以要先安裝 babel 的部份，然後在安裝 HMR。

1. 安裝等等需要用到的 dependencies

```
yarn add -D @babel/core @babel/preset-env @babel/preset-react babel-loader
yarn add -D react-hot-loader @types/react-hot-loader
yarn add -D webpack-dev-server @types/webpack-dev-server
```

2. 繼續使用 awesome-typescript-loader，在 webpack 設定檔加入︰

```js
{
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
          configFileName: "tsconfig.json",
          silent: true,
          // 以下重點
          useBabel: true,
          babelOptions: {
            babelrc: true,
          },
          babelCore: "@babel/core",
        },
      },
      // ...
    ]
  }
}
```

3. 修改 **tsconfig.json**，的 **target** 成為較高的版本

4. 新增檔案 **.babelrc**

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["react-hot-loader/babel"]
}
```

5. 待補

## Refs

[babel-plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)
