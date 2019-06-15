// @ts-check
const { NamedModulesPlugin, HotModuleReplacementPlugin } = require("webpack")
const webpackMerge = require("webpack-merge")
const createBaseConfig = require("./webpack.common")

/**
 * @type { import("webpack").Configuration }
 */
const config = {
    mode: "development",
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    devtool: "source-map",
    resolve: {
        alias: {
            "react-dom": "@hot-loader/react-dom",
        },
    },
    plugins: [new NamedModulesPlugin(), new HotModuleReplacementPlugin()],
    // 使用 nodejs 啟動一個 web server，並擁有 hot module reload 功能
    devServer: {
        hot: true,
        compress: true,
        host: "0.0.0.0",
        port: 3000,
        open: true,
        public: "localhost:3000",
        publicPath: "/",
        clientLogLevel: "warning",
        stats: {
            colors: true,
            all: false,
            assets: false,
            builtAt: true,
            cached: true,
            cachedAssets: true,
            children: false,
            chunks: false,
        },
        // NOTE: 針對 createBrowserHistory, historyApiFallback 需要設定為 true, 且在實際應用中要後端支持。
        historyApiFallback: true,
        proxy: [
            {
                context: ["/apis"],
                target: "http://localhost:8888/",
                secure: false,
                changeOrigin: true,
                logLevel: "warn",
            },
        ],
    },
}

module.exports = webpackMerge(createBaseConfig({ mode: config.mode }), config)
