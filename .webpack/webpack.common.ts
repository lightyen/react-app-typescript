import { Configuration, Entry, DllReferencePlugin } from "webpack"
import * as path from "path"
import * as CleanWebpackPlugin from "clean-webpack-plugin"
import * as HtmlWebpackPlugin from "html-webpack-plugin"
import * as MiniCssExtractPlugin from "mini-css-extract-plugin"
import { TsConfigPathsPlugin } from "awesome-typescript-loader"
import TsImportPlugin = require("ts-import-plugin")
const WebpackBar = require("webpackbar")
const packageJSON = require("../package.json")
// var nodeExternals = require('webpack-node-externals')

const entry: Entry = {
    index: "./src/index.tsx",
    404: "./src/404.tsx",
}

const titles = {
    index: packageJSON.name,
    404: "Not Found",
}

const distPath = path.resolve(__dirname, "../dist")
const vendor = path.resolve(__dirname, "../dist/vendor")
const rendererPath = path.resolve(__dirname, "../src")

const conf: Configuration = {
    entry,
    output: {
        path: distPath,
        filename: "[name].[chunkhash].js",
        publicPath: "/",
    },
    target: "web",
    resolveLoader: {
        modules: ["node_modules"],
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: "awesome-typescript-loader",
                options: {
                    configFileName: "tsconfig.json",
                    silent: true,
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
        new CleanWebpackPlugin(["dist"], {
            root: path.resolve(__dirname, ".."),
            verbose: true,
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "vendor.[contenthash].css",
        }),
        // new DllReferencePlugin({
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
                template: path.join("src", "template", name + ".ejs"),
                favicon: path.join("src", "assets", "images", "favicon.ico"),
                inject: "body",
                development:
                    process.env.NODE_ENV !== "production" ? '<div id="this-is-for-development-node"></div>' : "",
            })
        }),
    ),
}

export default conf