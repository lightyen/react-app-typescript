// NOTE: 用來生成動態連結庫的 webpack 設定檔

// @ts-check

const { DllPlugin } = require("webpack")

const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const WebpackBar = require("webpackbar")

const vendorPath = path.resolve(process.cwd(), "dist", "vendor")

/**
 * @type { import("webpack").Configuration }
 */
module.exports = {
    mode: "production",
    entry: {
        dll: ["react", "react-dom", "react-router-dom", "axios"],
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
        new DllPlugin({
            path: path.join(vendorPath, "manifest.json"),
            name: "[name]",
            context: vendorPath,
        }),
    ],
}
