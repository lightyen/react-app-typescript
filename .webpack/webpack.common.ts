// Base
import Webpack from "webpack"
import path from "path"

// Plugins
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import CompressionWebpackPlugin from "compression-webpack-plugin"
import WebpackBarPlugin from "webpackbar"
import { TsConfigPathsPlugin } from "awesome-typescript-loader"
import TsImportPlugin from "ts-import-plugin"
const DelWebpackPlugin = require("del-webpack-plugin")

// Other
import { name as AppName } from "../package.json"

const entry: Webpack.Entry = {
    index: "./src/index.tsx",
    404: "./src/404.tsx",
}

/** 一些自定義的設定 */
interface IOptions {
    /** 輸出位置 */
    dist?: string
    /** 程式進入點位置 */
    src?: string
    /** 第三方程式庫位置 */
    vendor?: string
}

export function getBaseConfig(options?: IOptions): Webpack.Configuration {
    const distDefaultPath = path.resolve(__dirname, "..", "dist")
    const srcDefaultPath = path.resolve(__dirname, "..", "src")
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
        new WebpackBarPlugin({ color: "blue", profile: true }),
        new DelWebpackPlugin({
            include: ["**"],
            exclude: options.vendor ? ["dll.js", "manifest.json"] : [],
            info: true,
            keepGeneratedAssets: true,
            allowExternal: false,
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
    ].concat(
        Object.keys(entry).map((name: string) => {
            const exclude = Object.keys(entry).slice()
            exclude.splice(Object.keys(entry).indexOf(name), 1)
            return new HtmlWebpackPlugin({
                filename: name + ".html",
                excludeChunks: exclude,
                minify: false,
                inject: false, // NOTE: 改成在 ejs 手動注入
                template: path.join(options.src, "template", name + ".ejs"),
                favicon: path.join(options.src, "assets", "images", "favicon.ico"),
                dll: options.vendor ? '<script type="text/javascript" src="/dll.js"></script>' : "",
                development:
                    process.env.NODE_ENV !== "production" ? '<div id="this-is-for-development-node"></div>' : "",
            })
        }),
    )

    if (options.vendor) {
        plugins.push(
            new Webpack.DllReferencePlugin({
                context: options.vendor,
                manifest: require(path.join(options.vendor, "manifest.json")),
            }),
        )
    }

    if (process.env.NODE_ENV === "production") {
        plugins.push(new CompressionWebpackPlugin({ algorithm: "gzip", threshold: 8192 }))
    }

    const conf: Webpack.Configuration = {
        entry,
        output: {
            path: options.dist,
            filename: "[name].[hash].js",
            publicPath: "/",
        },
        target: "web",
        resolveLoader: {
            modules: ["node_modules"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "awesome-typescript-loader",
                    options: {
                        configFileName: "tsconfig.json",
                        silent: true,
                        // NOTE: 可以選擇使用 babel
                        // useBabel: true,
                        // babelOptions: {
                        //     babelrc: true,
                        // },
                        // babelCore: "@babel/core",
                        getCustomTransformers: () => ({
                            before: [
                                TsImportPlugin([
                                    {
                                        libraryName: "antd",
                                        libraryDirectory: "lib",
                                        style: true,
                                    },
                                    {
                                        libraryName: "material-ui",
                                        libraryDirectory: "",
                                        camel2DashComponentName: false,
                                    },
                                ]),
                            ],
                        }),
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.(png|jp(e?)g|gif|svg)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: { name: "assets/images/[name].[ext]" },
                        },
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: { name: "assets/fonts/[name].[ext]?[hash]" },
                        },
                        {
                            loader: "url-loader",
                            query: { name: "assets/fonts/[name].[ext]" },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        process.env.NODE_ENV !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
                        { loader: "css-loader" },
                        {
                            loader: "postcss-loader",
                            options: { config: { path: ".config/" } },
                        },
                    ],
                },
                {
                    test: /\.less$/,
                    use: [
                        process.env.NODE_ENV !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
                        { loader: "css-loader" },
                        {
                            loader: "postcss-loader",
                            options: { config: { path: ".config/" } },
                        },
                        {
                            loader: "less-loader",
                            options: {
                                javascriptEnabled: true,
                                modifyVars: {
                                    // NOTE: 如果有 ant-design 要改變主題色，則在此
                                    // "primary-color": "#1DA57A",
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.s(a|c)ss$/,
                    use: [
                        process.env.NODE_ENV !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
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
                            },
                        },
                        {
                            loader: "postcss-loader",
                            options: { config: { path: ".config/" } },
                        },
                        { loader: "sass-loader" },
                    ],
                },
            ],
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"],
            plugins: [
                new TsConfigPathsPlugin({
                    configFile: "tsconfig.json",
                }),
            ],
        },
        plugins,
    }

    return conf
}
