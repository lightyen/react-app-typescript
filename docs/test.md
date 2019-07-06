# Test

單元測試

## Test with Jest

### 安裝

```sh
yarn add -D jest @types/jest ts-jest
yarn add -D enzyme @types/enzyme enzyme-adapter-react-16 @types/enzyme-adapter-react-16 enzyme-to-json @types/enzyme-to-json
```

### 修改 webpack.config.js
```js
{
    modules: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /\.test.tsx?$/,
                // ...
            }
        ]
    }
}
```

## link

- https://kulshekhar.github.io/ts-jest/user/config/
