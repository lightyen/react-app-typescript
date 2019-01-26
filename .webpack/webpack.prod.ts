import webpackMerge from "webpack-merge"
import Webpack from "webpack"
import path from "path"
import os from "os"

process.env.NODE_ENV = "production"
import { getBaseConfig } from "./webpack.common"

// NOTE: 可以使用 dll 模式，以減少編譯時間
//
// 1. 先建置 dll
//
// 2. 接著在編譯主程式時代入 dll 位置，詳細如下：
//
// const vendor = path.resolve(__dirname, "..", "dist")
// getBaseConfig({ vendor })

export default webpackMerge(getBaseConfig(), {
    performance: {
        hints: "warning",
        assetFilter: (filename: string) => {
            return filename.endsWith(".css") || filename.endsWith(".js")
        },
    },
    mode: "production",
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: "all",
        },
    },
    resolve: {
        alias: {},
    },
    plugins: [new Webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /es|zh/)],
})
