import webpackMerge from "webpack-merge"
import Webpack from "webpack"

process.env.NODE_ENV = "production"
import { getBaseConfig } from "./webpack.common"

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
            // minSize: 30000,
            // minChunks: 1,
            // maxAsyncRequests: 5,
            // maxInitialRequests: 3,
            // name: true,
            // cacheGroups: {
            //     "vendors": {
            //         test: /[\\/]node_modules[\\/]/,
            //         priority: -10,
            //     },
            //     "default": {
            //         minChunks: 2,
            //         priority: -20,
            //         reuseExistingChunk: true,
            //     },
            //     "react-vendor": {
            //         test: (module, chunks) => /react/.test(module.context),
            //         priority: 5,
            //     },
            //     "antd-vendor": {
            //         test: (module, chunks) => /antd/.test(module.context),
            //         priority: 1,
            //     },
            // },
        },
    },
    resolve: {
        alias: {},
    },
    plugins: [new Webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /es|zh/)],
})
