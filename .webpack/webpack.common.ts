// Base
import Webpack from "webpack"
import path from "path"

// Plugins
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import WebpackBarPlugin from "webpackbar"
import { TsConfigPathsPlugin } from "awesome-typescript-loader"
import TsImportPlugin from "ts-import-plugin"
const DelWebpackPlugin = require("del-webpack-plugin")

// Other
import { name as AppName } from "cwd/package.json"

const entry: Webpack.Entry = {
    index: "./src/index.tsx",
    404: "./src/404.tsx",
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
    ]

    for (const name in entry) {
        if (entry.hasOwnProperty(name)) {
            const exclude = Object.keys(entry).slice()
            exclude.splice(Object.keys(entry).indexOf(name), 1)
            plugins.push(
                new HtmlWebpackPlugin({
                    filename: name + ".html",
                    excludeChunks: exclude,
                    minify: false,
                    inject: false, // NOTE: 改成在 ejs 手動注入
                    template: path.join(options.src, "template", name + ".ejs"),
                    favicon: path.join(options.src, "assets", "images", "favicon.ico"),
                    dll: options.vendor ? '<script type="text/javascript" src="/dll.js"></script>' : "",
                    development: devMode ? '<div id="this-is-for-development-node"></div>' : "",
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

    const conf: Webpack.Configuration = {
        entry,
        output: {
            path: options.dist,
            filename: "[name].[hash].js",
            publicPath: "/",
        },
        target: "web",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: "awesome-typescript-loader",
                    options: {
                        configFileName: "tsconfig.json",
                        silent: true,
                        useBabel: true,
                        babelOptions: {
                            babelrc: true,
                        },
                        babelCore: "@babel/core",
                        getCustomTransformers: () => ({
                            before: [
                                TsImportPlugin([
                                    {
                                        libraryName: "antd",
                                        libraryDirectory: "lib",
                                        style: true,
                                    },
                                    {
                                        libraryName: "@material-ui/core",
                                        libraryDirectory: "",
                                        camel2DashComponentName: false,
                                    },
                                ]),
                            ],
                        }),
                    },
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
                    test: /\.(le|c)ss$/,
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
                            },
                        },
                        {
                            loader: "postcss-loader",
                            options: { config: { path: ".config/" } },
                        },
                        "less-loader",
                    ],
                },
                {
                    test: /\.s(a|c)ss$/,
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
                            },
                        },
                        {
                            loader: "postcss-loader",
                            options: { config: { path: ".config/" } },
                        },
                        "sass-loader",
                    ],
                },
                // 對屬於 node_modules 的樣式，modules = false：
                {
                    test: /\.(le|c)ss$/,
                    include: /node_modules/,
                    use: [
                        devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                        { loader: "css-loader" },
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
                    use: [devMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
