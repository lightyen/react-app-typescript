
import { HotModuleReplacementPlugin, NamedChunksPlugin, NamedModulesPlugin } from "webpack"
import * as webpackMerge from "webpack-merge"
import baseWebpackConfig from "./webpack.config"

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
        new HotModuleReplacementPlugin(),
        new NamedModulesPlugin(),
        new NamedChunksPlugin(),
    ],
})
