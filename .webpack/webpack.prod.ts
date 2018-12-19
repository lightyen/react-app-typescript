import * as webpackMerge from "webpack-merge"
import { ContextReplacementPlugin } from "webpack"
import * as path from "path"

process.env.NODE_ENV = "production"
import baseWebpackConfig from "./webpack.config"

export default webpackMerge(baseWebpackConfig, {
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
        alias: {
            // https://github.com/ant-design/ant-design/issues/12011
            // 引入icons造成打包過大問題：暫時辦法是自訂需要的icon,
            // 但antd自己也有引用很多icon, 所以很多時候根本不知道總共有多少個要引入 ...
            // "@ant-design/icons/lib/dist$": path.resolve(__dirname, "../renderer/icons.ts"),
        },
    },
    plugins: [new ContextReplacementPlugin(/moment[/\\]locale$/, /es|zh/)],
})
