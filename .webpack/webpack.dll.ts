// NOTE: 用來生成動態連結庫的 webpack 設定檔

import Webpack from "webpack"
import path from "path"
import CleanWebpackPlugin from "clean-webpack-plugin"
import WebpackBar from "webpackbar"

const vendorPath = path.resolve(process.cwd(), "dist")

const config: Webpack.Configuration = {
    mode: "production",
    entry: {
        dll: ["react", "react-dom", "react-router-dom", "mobx", "mobx-react", "axios"],
    },
    output: {
        path: vendorPath,
        filename: "[name].js",
        library: "[name]",
        publicPath: "/",
    },
    plugins: [
        new WebpackBar({ name: "DLL", color: "blue" }),
        new CleanWebpackPlugin({ verbose: true }),
        new Webpack.DllPlugin({
            path: path.join(vendorPath, "manifest.json"),
            name: "[name]",
            context: vendorPath,
        }),
    ],
}

export default config
