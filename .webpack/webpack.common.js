// @ts-ignore
const packageJSON = require("../package.json")

// @ts-check
const { EnvironmentPlugin, ProvidePlugin, DllReferencePlugin } = require("webpack")
const path = require("path")

// Plugins
const { TsConfigPathsPlugin } = require("awesome-typescript-loader")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExcludeAssetsPlugin = require("html-webpack-exclude-assets-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const WebpackBarPlugin = require("webpackbar")
const ManifestPlugin = require("webpack-manifest-plugin")
const WorkboxPlugin = require("workbox-webpack-plugin")

// NOTE: 關閉 webpack 要求 donate 訊息
process.env.DISABLE_OPENCOLLECTIVE = "true"

/** @type { import("webpack").Entry } */
const entry = {
    fonts: "./src/assets/fonts/fonts.css",
    index: "./src/index",
    404: "./src/index",
}

/** @typedef {{
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
    const dist = (options && options.dist) || path.resolve(workingDirectory, "dist")
    const src = (options && options.src) || path.resolve(workingDirectory, "src")
    const vendor = (options && options.vendor) || ""
    const isDevelopment = process.env.NODE_ENV === "development"

    process.env.PUBLIC_URL = process.env.PUBLIC_URL || ""

    /**
     * @type {import("webpack").Plugin[]}
     */
    let plugins = [
        new WebpackBarPlugin({ color: "blue", name: "React" }),
        new EnvironmentPlugin({
            NODE_ENV: process.env.NODE_ENV,
            PUBLIC_URL: process.env.PUBLIC_URL,
            APP_NAME: packageJSON.name,
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:8].css",
            chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        }),
        new ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new ManifestPlugin({ fileName: "asset-manifest.json" }),
        // https://developers.google.com/web/tools/workbox/guides/codelabs/webpack
        !isDevelopment &&
            new WorkboxPlugin.GenerateSW({
                clientsClaim: true,
                exclude: [/\.map$/, /asset-manifest\.json$/],
                navigateFallback: process.env.PUBLIC_URL + "/index.html",
                navigateFallbackBlacklist: [
                    // Exclude URLs starting with /_, as they're likely an API call
                    new RegExp("^/_"),
                    // Exclude URLs containing a dot, as they're likely a resource in
                    // public/ and not a SPA route
                    new RegExp("/[^/]+\\.[^/]+$"),
                ],
            }),
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
                    minify: isDevelopment
                        ? false
                        : {
                              removeComments: true,
                              collapseWhitespace: true,
                              removeRedundantAttributes: true,
                              useShortDoctype: true,
                              removeEmptyAttributes: true,
                              removeStyleLinkTypeAttributes: true,
                              keepClosingSlash: true,
                              minifyJS: true,
                              minifyCSS: true,
                              minifyURLs: true,
                          },
                    excludeAssets: exclude.map(name => new RegExp(`${name}.*\\.js`)),
                    title: packageJSON.name,
                    template: path.resolve(__dirname, "public", "index.pug"),
                    favicon: path.join(src, "assets", "favicon.ico"),
                    manifest: process.env.PUBLIC_URL + "/manifest.json",
                    vendor: vendor ? "/vendor/vendor.js" : undefined,
                }),
            )
        }
    }
    plugins.push(new ExcludeAssetsPlugin())

    if (vendor) {
        plugins.push(
            new DllReferencePlugin({
                context: vendor,
                manifest: require(path.join(vendor, "vendor.json")),
            }),
        )
    }

    plugins = plugins.filter(p => !!p)

    /**
     * @type {import("webpack").Loader}
     * See [style-loader]{@link https://github.com/webpack-contrib/style-loader} and [mini-css-extract-plugin]{@link https://github.com/webpack-contrib/mini-css-extract-plugin}.
     */
    const styleLoader = {
        loader: isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
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
            name: "static/assets/images/[name].[ext]?[hash:8]",
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
            name: "static/assets/fonts/[name].[ext]?[hash:8]",
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
            path: dist,
            filename: isDevelopment ? "static/js/[name].bundle.js" : "static/js/[name].[contenthash:8].js",
            chunkFilename: isDevelopment ? "static/js/[name].chunk.js" : "static/js/[name].[contenthash:8].chunk.js",
            publicPath: process.env.PUBLIC_URL + "/",
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
