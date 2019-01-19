import webpackMerge from "webpack-merge"
import baseWebpackConfig from "./webpack.dev"

const BrowserSyncPlugin = require("browser-sync-webpack-plugin")

export default webpackMerge(baseWebpackConfig, {
    watch: true,
    watchOptions: {},
    plugins: [
        new BrowserSyncPlugin(
            {
                host: "localhost",
                port: "3000",
                proxy: "http://localhost:8080/",
                // logLevel: "silent",
            },
            { reload: true },
        ),
    ],
})
