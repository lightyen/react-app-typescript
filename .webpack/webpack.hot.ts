import path from "path"
import Webpack from "webpack"
import webpackMerge from "webpack-merge"
import {} from "webpack-dev-server"
import baseWebpackConfig from "./webpack.dev"

export default webpackMerge(baseWebpackConfig, {
    stats: "none",
    devtool: "eval",
    plugins: [new Webpack.NamedModulesPlugin(), new Webpack.HotModuleReplacementPlugin()],
    // 啟動一個 nodejs web server，並有 hot module reload 功能
    devServer: {
        hot: true,
        compress: true,
        host: "localhost",
        port: 3000,
    },
})
