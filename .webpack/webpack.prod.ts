import webpackMerge from "webpack-merge"
import Webpack from "webpack"
import CompressionWebpackPlugin from "compression-webpack-plugin"
import path from "path"
import os from "os"

import CleanWebpackPlugin from "clean-webpack-plugin"

process.env.NODE_ENV = "production"
import { createBaseConfig } from "./webpack.common"

const productionPath = path.resolve(process.cwd(), "dist")
/** DLL 位置 */
const vendorPath: string = "" // path.resolve(process.cwd(), "dist", "vendor")

const plugins: Webpack.Plugin[] = [
    new Webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /es|zh/),
    new CompressionWebpackPlugin({ algorithm: "gzip", threshold: 8192 }),
    new CleanWebpackPlugin({
        verbose: true,
        cleanOnceBeforeBuildPatterns: vendorPath
            ? ["**/*", "!vendor", "!vendor/vendor.js", "!vendor/manifest.json"]
            : ["**/*"],
    }),
]

const config: Webpack.Configuration = {
    mode: "production",
    performance: {
        hints: "warning",
        assetFilter: (filename: string) => {
            return filename.endsWith(".css") || filename.endsWith(".js")
        },
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: "all",
        },
    },
    resolve: {
        alias: {},
    },
    plugins,
}

export default webpackMerge(
    createBaseConfig({
        dist: productionPath,
        vendor: vendorPath,
    }),
    config,
)
