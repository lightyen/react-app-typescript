import Webpack from "webpack"
import webpackMerge from "webpack-merge"
import path from "path"
import os from "os"

process.env.NODE_ENV = "development"
import { getBaseConfig } from "./webpack.common"

// NOTE: 可以選擇你要的 dist 位置
// const dist = path.resolve(os.homedir(), "Documents", "react-app-typescript", "dist")

export default webpackMerge(getBaseConfig(), {
    performance: {
        hints: false,
        assetFilter: (filename: string) => {
            return filename.endsWith(".css") || filename.endsWith(".js")
        },
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
        ],
    },

    mode: "development",
    devtool: "source-map",
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: ["node_modules"],
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NamedModulesPlugin(),
        new Webpack.NamedChunksPlugin(),
    ],
})
