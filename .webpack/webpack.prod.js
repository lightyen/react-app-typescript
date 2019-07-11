// @ts-check
const webpackMerge = require("webpack-merge")
const { ContextReplacementPlugin, optimize } = require("webpack")
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const TerserJSPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const path = require("path")
const createBaseConfig = require("./webpack.common")

/** DLL 位置 */
const vendorPath = "" // path.resolve(process.cwd(), "dist", "vendor")

/**
 * @type {import("webpack").Plugin[]}
 */
const plugins = [
    new ContextReplacementPlugin(/moment[/\\]locale$/, /es|zh/),
    new CompressionWebpackPlugin({ algorithm: "gzip", threshold: 10240 }),
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: vendorPath
            ? ["**/*", "!vendor", "!vendor/vendor.js", "!vendor/manifest.json"]
            : ["**/*"],
    }),
]

/**
 * @type { import("webpack").Configuration }
 */
const config = {
    mode: "production",
    stats: {
        children: false,
        modules: false,
        entrypoints: false,
    },
    performance: {
        hints: "warning",
        maxEntrypointSize: 614400,
        maxAssetSize: 614400,
        assetFilter: filename => {
            const ext = path.extname(filename)
            return ext === "css" || ext === ".js"
        },
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
        splitChunks: {
            cacheGroups: {
                App: {
                    name: "App", // NOTE: core ui 或 bootstrap 等樣式
                    chunks: "all",
                    test: /style\.scss$/,
                },
            },
        },
    },
    resolve: {
        alias: {},
    },
    plugins,
}

module.exports = webpackMerge(
    createBaseConfig({
        mode: config.mode,
        vendor: vendorPath,
    }),
    config,
)
