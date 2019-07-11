// @ts-check
const webpackMerge = require("webpack-merge")
const { ContextReplacementPlugin } = require("webpack")
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
    new ContextReplacementPlugin(/moment[/\\]locale$/, /^es$|zh/),
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
            maxInitialRequests: 6,
            cacheGroups: {
                bootstrap: {
                    name: "bootstrap",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]bootstrap/,
                },
                moment: {
                    name: "moment",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]moment/,
                },
                reactdom: {
                    name: "react-dom",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]react-dom/,
                },
                jquery: {
                    name: "jquery",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]jquery/,
                },
                fontAwesome: {
                    name: "fa",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]@fortawesome/,
                },
                App: {
                    name: "App",
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
