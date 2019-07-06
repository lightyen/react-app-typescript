// @ts-ignore
const packageJSON = require("../package.json")

// @ts-check
const { EnvironmentPlugin, ProvidePlugin, DllReferencePlugin } = require("webpack")
const path = require("path")

// Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const WebpackBarPlugin = require("webpackbar")
const { TsConfigPathsPlugin } = require("awesome-typescript-loader")
const WorkboxPlugin = require("workbox-webpack-plugin")
const TsImportPlugin = require("ts-import-plugin")

// NOTE: 關閉 webpack 要求 donate 訊息
process.env.DISABLE_OPENCOLLECTIVE = "true"

/** @type { import("webpack").Entry } */
const entry = {
    index: "./src/index",
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

    /**
     * @type {import("webpack").Plugin[]}
     */
    const plugins = [
        new WebpackBarPlugin({ color: "blue", name: "React" }),
        new EnvironmentPlugin({
            NODE_ENV: options.mode,
            PUBLIC_URL: process.env.PUBLIC_URL || "",
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[id].[contenthash:8].css",
        }),
        new ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        // https://developers.google.com/web/tools/workbox/guides/codelabs/webpack
        new WorkboxPlugin.GenerateSW(),
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
                    vendor: options.vendor ? "/vendor/vendor.js" : undefined,
                }),
            )
        }
    }

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
        loader: options.mode !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
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
            name: "assets/images/[name].[ext]",
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

    return {
        entry,
        output: {
            path: options.dist,
            filename: "js/[name].[hash:12].js",
            chunkFilename: "js/[name].[hash:8].js",
            publicPath: process.env.PUBLIC_PATH || "/",
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
            alias: {},
        },
        plugins,
    }
}
