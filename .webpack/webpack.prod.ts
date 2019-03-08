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
        cleanOnceBeforeBuildPatterns: vendorPath
            ? ["**/*", "!vendor", "!vendor/vendor.js", "!vendor/manifest.json"]
            : ["**/*"],
    }),
]

const config: Webpack.Configuration = {
    mode: "production",
    stats: {
        children: false,
        modules: false,
        entrypoints: false,
    },
    performance: {
        hints: "warning",
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
        assetFilter: (filename: string) => {
            const ext = path.extname(filename)
            return ext === "css" || ext === ".js"
        },
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: "all",
            maxSize: 250000,
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
