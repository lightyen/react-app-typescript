// @ts-ignore
const packageJSON = require("../package.json")

// @ts-check
const { EnvironmentPlugin, ProvidePlugin, DllReferencePlugin } = require("webpack")
const path = require("path")

// Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExcludeAssetsPlugin = require("html-webpack-exclude-assets-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ExtractCssChunksPlugin = require("extract-css-chunks-webpack-plugin")
const WebpackBarPlugin = require("webpackbar")
const { TsConfigPathsPlugin } = require("awesome-typescript-loader")
const WorkboxPlugin = require("workbox-webpack-plugin")

// NOTE: 關閉 webpack 要求 donate 訊息
process.env.DISABLE_OPENCOLLECTIVE = "true"

/** @type { import("webpack").Entry } */
const entry = {
    fonts: "./src/assets/fonts/fonts.css",
    index: "./src/index",
    404: "./src/404",
}

/** @typedef {{
 *    mode: "development" | "production" | "none"
 *    dist?: string
 *    src?: string
 *    vendor?: string
 * }} Options */

/**
 * @param {Options} options
 *
 * @returns { import("webpack").Configuration }
 */
module.exports = function(options) {
    const workingDirectory = process.cwd()
    const distDefaultPath = path.resolve(workingDirectory, "dist")
    const srcDefaultPath = path.resolve(workingDirectory, "src")
    if (!options.dist) {
        options.dist = distDefaultPath
    }
    if (!options.src) {
        options.src = srcDefaultPath
    }

    process.env.PUBLIC_URL = process.env.PUBLIC_URL || ""
    process.env.PUBLIC_PATH = process.env.PUBLIC_PATH || ""

    /**
     * @type {import("webpack").Plugin[]}
     */
    const plugins = [
        new WebpackBarPlugin({ color: "blue", name: "React" }),
        new EnvironmentPlugin({
            NODE_ENV: options.mode,
            APP_NAME: packageJSON.name,
            PUBLIC_URL: process.env.PUBLIC_URL,
            PUBLIC_PATH: process.env.PUBLIC_PATH,
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash:8].css",
            chunkFilename: "css/[id].[chunkhash:8].css",
        }),
        // new ExtractCssChunksPlugin({
        //     filename: "css/[name].css",
        //     chunkFilename: "css/[id].[contenthash:8].css",
        // }),
        new ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        // https://developers.google.com/web/tools/workbox/guides/codelabs/webpack
        new WorkboxPlugin.GenerateSW(),
    ]

    for (const name in entry) {
        if (entry.hasOwnProperty(name)) {
            if (name === "fonts") {
                continue
            }
            const exclude = Object.keys(entry).slice()
            exclude.splice(Object.keys(entry).indexOf(name), 1)
            plugins.push(
                new HtmlWebpackPlugin({
                    inject: true,
                    filename: name + ".html",
                    meta: {
                        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
                        "X-UA-Compatible": {
                            "http-equiv": "X-UA-Compatible",
                            content: "ie=edge",
                        },
                        charset: "utf-8",
                        description: packageJSON.description,
                        author: packageJSON.author,
                    },
                    minify: false,
                    excludeAssets: exclude.map(name => new RegExp(`${name}.*\\.js`)),
                    title: packageJSON.name,
                    template: path.resolve(__dirname, "public", "index.pug"),
                    favicon: path.join(options.src, "assets", "favicon.ico"),
                    vendor: options.vendor ? "/vendor/vendor.js" : undefined,
                }),
            )
        }
    }

    plugins.push(new ExcludeAssetsPlugin())

    if (options.vendor) {
        plugins.push(
            new DllReferencePlugin({
                context: options.vendor,
                manifest: require(path.join(options.vendor, "manifest.json")),
            }),
        )
    }

    /**
     * @type {import("webpack").Loader}
     * See [style-loader]{@link https://github.com/webpack-contrib/style-loader} and [mini-css-extract-plugin]{@link https://github.com/webpack-contrib/mini-css-extract-plugin}.
     */
    const styleLoader = {
        loader: process.env.NODE_ENV === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
    }

    /**
     * @type {import("webpack").Loader}
     * See [url-loader]{@link https://github.com/webpack-contrib/url-loader} and [file-loader]{@link https://github.com/webpack-contrib/file-loader}.
     */
    const imageLoader = {
        // NOTE: A loader for webpack which transforms files into base64 URIs.
        loader: "url-loader",
        options: {
            // NOTE: output path
            name: "assets/images/[name].[ext]?[hash:8]",
            limit: 8192,
            fallback: "file-loader",
        },
    }

    /**
     * @type {import("webpack").Loader}
     */
    const fontLoader = {
        loader: "url-loader",
        options: {
            name: "assets/fonts/[name].[ext]?[hash:8]",
            limit: 8192,
            ack: "file-loader",
        },
    }

    /**
     * @type {import("webpack").Loader}
     */
    const tsxLoader = {
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
        },
    }

    return {
        entry,
        output: {
            path: options.dist,
            filename: "js/[name].[hash:8].js",
            chunkFilename: "js/[name].[hash:6].js",
            publicPath: process.env.PUBLIC_PATH || "/",
        },
        target: "web",
        module: {
            rules: [
                {
                    test: /\.pug$/,
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
                    use: tsxLoader,
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: imageLoader,
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                    use: fontLoader,
                },
                // For user space:
                {
                    exclude: /node_modules/,
                    test: /\.css$/,
                    use: [styleLoader, "css-loader", "postcss-loader"],
                },
                {
                    exclude: /node_modules/,
                    test: /\.less$/,
                    use: [
                        styleLoader,
                        {
                            loader: "dts-css-modules-loader",
                            options: {
                                namedExport: true,
                                banner:
                                    "// This file is automatically generated by dts-css-modules-loader.\n// Please do not change this file!\n",
                            },
                        },
                        "css-loader",
                        "postcss-loader",
                        "less-loader",
                    ],
                },
                {
                    exclude: /node_modules/,
                    test: /\.s(a|c)ss$/,
                    use: [
                        styleLoader,
                        // path.join(__dirname, "./custom-loader"),
                        "css-loader",
                        "postcss-loader",
                        "sass-loader",
                    ],
                },
                // For node_modules:
                {
                    include: /node_modules/,
                    test: /.css$/,
                    use: [styleLoader, "css-loader", "postcss-loader"],
                },
                {
                    include: /node_modules/,
                    test: /\.less$/,
                    use: [
                        styleLoader,
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
                    include: /node_modules/,
                    test: /\.s(a|c)ss$/,
                    use: [styleLoader, "css-loader", "postcss-loader", "sass-loader"],
                },
            ],
        },
        // NOTE: https://webpack.js.org/configuration/resolve/
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            plugins: [
                new TsConfigPathsPlugin({
                    configFileName: path.join(workingDirectory, "tsconfig.json"),
                }),
            ],
            alias: {
                // "~": path.resolve(__dirname, "../src"),
            },
        },
        plugins,
    }
}
