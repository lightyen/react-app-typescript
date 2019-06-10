// @ts-check

const webpackMerge = require("webpack-merge")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const baseConfig = require("./webpack.prod")

module.exports = webpackMerge(baseConfig, {
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: "server",
            analyzerHost: "127.0.0.1",
            analyzerPort: 0,
            reportFilename: "report.html",
            defaultSizes: "parsed",
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: "stats.json",
            statsOptions: null,
            logLevel: "info",
        }),
    ],
})
