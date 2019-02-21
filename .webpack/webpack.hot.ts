import Webpack from "webpack"
import webpackMerge from "webpack-merge"
import {} from "webpack-dev-server"

process.env.NODE_ENV = "development"
import { createBaseConfig } from "./webpack.common"

export default webpackMerge(createBaseConfig(), {
    mode: "development",
    performance: {
        hints: false,
        assetFilter: (filename: string) => {
            return filename.endsWith(".css") || filename.endsWith(".js")
        },
    },
    stats: "none",
    devtool: "eval",
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
        open: true,
        host: "localhost",
        port: 3000,
        clientLogLevel: "none",
        historyApiFallback: true,
        // proxy: {
        //     "apis/": {
        //         target: "http://xxx.com/",
        //         headers: { 'Access-Control-Allow-Origin': '*' }
        //     }
        // },
    },
})
