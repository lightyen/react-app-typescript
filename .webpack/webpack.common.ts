import Webpack from "webpack"
import path from "path"
import CleanWebpackPlugin from "clean-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { TsConfigPathsPlugin } from "awesome-typescript-loader"
import TsImportPlugin = require("ts-import-plugin")
const WebpackBar = require("webpackbar")
const packageJSON = require("../package.json")
// var nodeExternals = require('webpack-node-externals')

const entry: Webpack.Entry = {
    index: "./src/index.tsx",
    404: "./src/404.tsx",
}

const titles = {
    index: packageJSON.name,
    404: "Not Found",
}

export function getBaseConfig(opt?: { dist?: string; src?: string }): Webpack.Configuration {
    const vendor = path.resolve(__dirname, "../dist/vendor")
    let distPath = path.resolve(__dirname, "../dist")
    let srcPath = path.resolve(__dirname, "../src")
    if (opt) {
        if (opt.dist) {
            distPath = opt.dist
        }
        if (opt.src) {
            srcPath = opt.src
        }
    }

    const conf: Webpack.Configuration = {
        entry,
        output: {
            path: distPath,
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
                    test: /\.(js|ts)x?$/,
                    loader: "awesome-typescript-loader",
                    options: {
                        configFileName: "tsconfig.json",
                        silent: true,
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
                                    // 改變antd主題色
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
                            loader: "typings-for-css-modules-loader",
                            options: {
                                modules: true,
                                namedExport: true,
                                camelCase: true,
                                banner:
                                    "// This file is automatically generated by typings-for-css-modules.\n// Please do not change this file!\n",
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
        plugins: [
            new WebpackBar({ color: "blue" }),
            new CleanWebpackPlugin([path.basename(distPath)], {
                root: path.resolve(distPath, ".."),
                verbose: false,
            }),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
                chunkFilename: "vendor.[contenthash].css",
            }),
            // new Webpack.DllReferencePlugin({
            //     context: vendor,
            //     manifest: require(path.resolve(__dirname, "../manifest.json")),
            // }),
        ].concat(
            Object.keys(entry).map((name: string) => {
                const exclude = Object.keys(entry).slice()
                exclude.splice(Object.keys(entry).indexOf(name), 1)
                return new HtmlWebpackPlugin({
                    filename: name + ".html",
                    excludeChunks: exclude,
                    title: titles[name],
                    minify:
                        process.env.NODE_ENV !== "production"
                            ? false
                            : {
                                  collapseWhitespace: true,
                                  minifyCSS: true,
                              },
                    template: path.join(srcPath, "template", name + ".ejs"),
                    favicon: path.join(srcPath, "assets", "images", "favicon.ico"),
                    inject: "body",
                    development:
                        process.env.NODE_ENV !== "production" ? '<div id="this-is-for-development-node"></div>' : "",
                })
            }),
        ),
    }

    return conf
}
