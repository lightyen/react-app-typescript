// @ts-check
const { NamedModulesPlugin, HotModuleReplacementPlugin } = require("webpack")
const webpackMerge = require("webpack-merge")
const createBaseConfig = require("./webpack.common")
const url = require("url")
const path = require("path")

const defaultPort = 3000
process.env.NODE_ENV = "development"
process.env.PUBLIC_URL = ""

/**
 * @type { import("webpack").Configuration }
 */
const config = {
    mode: "development",
    performance: false,
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
        port: defaultPort,
        open: true,
        https: false,
        public: `http://localhost:${defaultPort}`,
        publicPath: "/",
        clientLogLevel: "warning",
        stats: {
            all: false,
            colors: true,
            builtAt: true,
            errors: true,
            cached: true,
            cachedAssets: true,
            warnings: true,
        },
        // NOTE: 針對 createBrowserHistory, historyApiFallback 需要設定為 true, 且在實際應用中要後端支持。
        historyApiFallback: {
            rewrites: [
                {
                    from: /\/static\/css/g,
                    to: context => process.env.PUBLIC_URL + "/fonts/" + path.basename(context.parsedUrl.pathname),
                },
                { from: /.*/g, to: process.env.PUBLIC_URL + "/index.html" },
            ],
        },
        contentBase: path.join(process.cwd(), "src", "assets"),
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

module.exports = webpackMerge(createBaseConfig({}), config)
