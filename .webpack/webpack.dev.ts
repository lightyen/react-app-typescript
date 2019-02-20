import Webpack from "webpack"
import webpackMerge from "webpack-merge"
import path from "path"
import os from "os"

process.env.NODE_ENV = "development"
import { createBaseConfig } from "./webpack.common"

// NOTE: 可以選擇你要的 dist 位置
// const dist = path.resolve(os.homedir(), "Documents", "react-app-typescript", "dist")
// getBaseConfig({dist})

export default webpackMerge(createBaseConfig(), {
    mode: "development",
    performance: {
        hints: false,
        assetFilter: (filename: string) => {
            return filename.endsWith(".css") || filename.endsWith(".js")
        },
    },
})
