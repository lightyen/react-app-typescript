// NOTE: 用來生成動態連結庫的 webpack 設定檔

import Webpack from "webpack"
import path from "path"
import CleanWebpackPlugin from "clean-webpack-plugin"

const vendorPath = path.resolve(process.cwd(), "dist")

const conf: Webpack.Configuration = {
    mode: "production",
    entry: {
        dll: ["react", "react-dom", "react-router-dom", "mobx", "mobx-react"],
    },
    output: {
        path: vendorPath,
        filename: "[name].js",
        library: "[name]",
        publicPath: "/",
    },
    plugins: [
        new CleanWebpackPlugin(path.basename(vendorPath), {
            root: path.resolve(vendorPath, ".."),
        }),
        new Webpack.DllPlugin({
            path: path.join(vendorPath, "manifest.json"),
            name: "[name]",
            context: vendorPath,
        }),
    ],
}

export default conf
