import * as webpackMerge from "webpack-merge"
import baseWebpackConfig from "./webpack.prod"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

export default webpackMerge(baseWebpackConfig, {
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: "server",
            analyzerHost: "127.0.0.1",
            analyzerPort: 8888,
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
