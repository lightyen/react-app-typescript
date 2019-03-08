import Webpack from "webpack"
import webpackMerge from "webpack-merge"
import {} from "webpack-dev-server"

process.env.NODE_ENV = "development"
import { createBaseConfig } from "./webpack.common"

// NOTE: 可以選擇你要的 dist 位置，例如︰
// const distPath = path.resolve(os.homedir(), "Documents", "react-app-typescript", "dist")
// getBaseConfig({dist: distPath})

export default webpackMerge(createBaseConfig(), {
    mode: "development",
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    devtool: "source-map",
    resolve: {
        alias: {
            "react-dom": "@hot-loader/react-dom",
        },
    },
    plugins: [new Webpack.NamedModulesPlugin(), new Webpack.HotModuleReplacementPlugin()],
    // 使用 nodejs 啟動一個 web server，並擁有 hot module reload 功能
    devServer: {
        hot: true,
        compress: true,
        host: "localhost",
        port: 3000,
        clientLogLevel: "error",
        stats: "errors-only",
        historyApiFallback: true,
        // proxy: {
        //     "apis/": {
        //         target: "http://xxx.com/",
        //         headers: { 'Access-Control-Allow-Origin': '*' }
        //     }
        // },
    },
})
