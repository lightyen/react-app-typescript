import { HotModuleReplacementPlugin, NamedChunksPlugin, NamedModulesPlugin } from "webpack"
import * as webpackMerge from "webpack-merge"

process.env.NODE_ENV = "development"
import baseWebpackConfig from "./webpack.common"

export default webpackMerge(baseWebpackConfig, {
    performance: {
        hints: false,
        assetFilter: (filename: string) => {
            return filename.endsWith(".css") || filename.endsWith(".js")
        },
    },
    mode: "development",
    devtool: "source-map",
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: ["node_modules"],
    },
    plugins: [
        // new HotModuleReplacementPlugin(),
        new NamedModulesPlugin(),
        new NamedChunksPlugin()
    ],
})
