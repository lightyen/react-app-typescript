// Base
import Webpack from "webpack"
import path from "path"

// Plugins
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import WebpackBarPlugin from "webpackbar"
import { TsConfigPathsPlugin } from "awesome-typescript-loader"
import TsImportPlugin from "ts-import-plugin"

// Other
import packageJSON from "../package.json"

// NOTE: 關閉 webpack 要求 donate 訊息
process.env.DISABLE_OPENCOLLECTIVE = "true"

const entry: Webpack.Entry = {
    index: "./src/index.tsx",
}

/** 一些自定義的設定 */
interface IOptions {
    /** 輸出位置，預設：${workspaceFolder}/dist */
    dist?: string
    /** 程式進入點位置，預設：${workspaceFolder}/src */
    src?: string
    /** 第三方程式庫位置 */
    vendor?: string
}

export function createBaseConfig(options?: IOptions): Webpack.Configuration {
    const workingDirectory = process.cwd()
    const distDefaultPath = path.resolve(workingDirectory, "dist")
    const srcDefaultPath = path.resolve(workingDirectory, "src")
    const devMode = process.env.NODE_ENV !== "production"
    if (!options) {
        options = {
            dist: distDefaultPath,
            src: srcDefaultPath,
            vendor: "",
        }
    } else {
        if (!options.dist) {
            options.dist = distDefaultPath
        }
        if (!options.src) {
            options.src = srcDefaultPath
        }
    }

    const plugins: Webpack.Plugin[] = [
        new WebpackBarPlugin({ color: "blue", name: "React" }),
        new Webpack.EnvironmentPlugin({
            NODE_ENV: process.env.NODE_ENV,
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
        }),
        new Webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
    ]

    for (const name in entry) {
        if (entry.hasOwnProperty(name)) {
            const exclude = Object.keys(entry).slice()
            exclude.splice(Object.keys(entry).indexOf(name), 1)
            plugins.push(
                new HtmlWebpackPlugin({
                    filename: name + ".html",
                    excludeChunks: exclude,
                    title: packageJSON.name,
                    minify: false,
                    inject: false,
                    template: path.join(options.src, "template", name + ".pug"),
                    favicon: path.join(options.src, "assets", "favicon.ico"),
                    vendor: options.vendor ? "/vendor/vendor.js" : null,
                }),
            )
        }
    }

    if (options.vendor) {
        plugins.push(
            new Webpack.DllReferencePlugin({
                context: options.vendor,
                manifest: require(path.join(options.vendor, "manifest.json")),
            }),
        )
    }

    return {
        entry,
        output: {
            path: options.dist,
            filename: "js/[name].[hash:12].js",
            chunkFilename: "js/[name].[hash:8].js",
            publicPath: "/",
        },
        target: "web",
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    include: /template/,
                    use: [
                        {
                            loader: "pug-loader",
                            options: {
                                pretty: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules|\.test.tsx?$/,
                    loader: "awesome-typescript-loader",
                    options: {
                        configFileName: path.join(workingDirectory, "tsconfig.json"),
                        silent: true,
                        useBabel: true,
                        useCache: true,
                        babelCore: "@babel/core",
                        babelOptions: {
                            babelrc: true,
                        },
                        // getCustomTransformers: () => ({
                        //     before: [
                        //         TsImportPlugin([
                        //             {
                        //                 libraryName: "antd",
                        //                 libraryDirectory: "lib",
                        //                 style: true,
                        //             },
                        //             {
                        //                 libraryName: "@material-ui/core",
                        //                 libraryDirectory: "",
                        //                 camel2DashComponentName: false,
                        //             },
                        //         ]),
                        //     ],
                        // }),
                    },
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    use: [
                        {
                            loader: "url-loader", // 依賴於 file-loader，別忘記安裝。
                            options: {
                                name: "assets/img/[name].[ext]",
                                limit: 8192,
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                name: "assets/fonts/[name].[ext]?[hash:8]",
                                limit: 100000,
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [devMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
                },
                {
                    test: /\.less$/,
                    exclude: /node_modules/,
                    use: [
                        devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                        {
                            loader: "dts-css-modules-loader",
                            options: {
                                namedExport: true,
                                banner:
                                    "// This file is automatically generated by dts-css-modules-loader.\n// Please do not change this file!\n",
                            },
                        },
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                camelCase: "only",
                                localIdentName: "[local]-[hash:base64:6]",
                                importLoaders: 2,
                            },
                        },
                        "postcss-loader",
                        "less-loader",
                    ],
                },
                {
                    test: /\.s(a|c)ss$/,
                    exclude: /node_modules/,
                    use: [
                        devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                // NOTE: bootstrap 4
                                modules: false,
                            },
                        },
                        "postcss-loader",
                        "sass-loader",
                    ],
                },
                // 對屬於 node_modules 的樣式，modules = false：
                {
                    test: /\.(le|c)ss$/,
                    include: /node_modules/,
                    use: [
                        devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        {
                            loader: "less-loader",
                            options: {
                                javascriptEnabled: true,
                                modifyVars: {
                                    // 改變antd主題色，例：
                                    // "primary-color": "#1da57a",
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.s(a|c)ss$/,
                    include: /node_modules/,
                    use: [
                        devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "sass-loader",
                    ],
                },
            ],
        },
        // NOTE: https://webpack.js.org/configuration/resolve/
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"],
            plugins: [
                new TsConfigPathsPlugin({
                    configFileName: path.join(workingDirectory, "tsconfig.json"),
                }),
            ],
            alias: {},
        },
        plugins,
    }
}
