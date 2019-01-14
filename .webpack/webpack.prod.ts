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
        },
    },
    resolve: {
        alias: {},
    },
    plugins: [new Webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /es|zh/)],
})
