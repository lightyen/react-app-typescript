// @ts-ignore
const packageJSON = require("../package.json")

// @ts-check
const {
    EnvironmentPlugin,
    ProvidePlugin,
    DllReferencePlugin,
    ExtendedAPIPlugin,
    NormalModuleReplacementPlugin,
} = require("webpack")
const path = require("path")

// Plugins
const { TsConfigPathsPlugin } = require("awesome-typescript-loader")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const WebpackBarPlugin = require("webpackbar")
const ManifestPlugin = require("webpack-manifest-plugin")
const WorkboxPlugin = require("workbox-webpack-plugin")

// NOTE: 關閉 webpack 要求 donate 訊息
process.env.DISABLE_OPENCOLLECTIVE = "true"

/** @type { import("webpack").Entry } */
const entry = {
    fonts: "./public/assets/fonts/index.css",
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
    const dist = (options && options.dist) || path.resolve(workingDirectory, "build")
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
            filename: "static/css/[name].[hash:8].css",
            chunkFilename: "static/css/[name].[hash:8].chunk.css",
        }),
        new ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new NormalModuleReplacementPlugin(/♾️$/, function(resource) {
            /**
             * @type {string}
             */
            const request = resource.request
            const options = {
                // plugins: ["line-numbers", "toolbar", "show-language"],
                // extensions: {
                //     js: "javascript",
                //     ts: "typescript",
                //     jsx: "jsx",
                //     tsx: "tsx",
                //     go: "go",
                //     sass: "sass",
                //     scss: "scss",
                //     css: "css",
                //     json: "json",
                // },
                // data: {
                // }
                // diff: true | { highlight: false }
            }
            resource.request = `!!prismjs-loader?${JSON.stringify(options)}!` + request.replace(/[♾️]/g, "")
        }),
        new ManifestPlugin({ fileName: "asset-manifest.json" }),
    ]

    for (const name in entry) {
        if (entry.hasOwnProperty(name)) {
            if (name === "fonts") {
                continue
            }
            const exclude = { ...entry }
            delete exclude[name]
            const excludeAssets = Object.keys(exclude).map(
                key => new RegExp(`${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
            )
            plugins.push(
                new HtmlWebpackPlugin({
                    templateParameters: (compilation, assets, options) => {
                        // NOTE: 去掉不需要的檔案
                        assets.css = assets.css.filter(path => !excludeAssets.some(e => e.test(path)))
                        assets.js = assets.js.filter(path => !excludeAssets.some(e => e.test(path)))
                        const manifest = process.env.PUBLIC_URL + "/manifest.json"
                        const dll = vendor ? "/vendor/vendor.js" : undefined
                        return {
                            compilation,
                            webpackConfig: compilation.options,
                            htmlWebpackPlugin: {
                                files: assets,
                                options,
                                manifest,
                                dll,
                            },
                        }
                    },
                    inject: false,
                    filename: name + ".html",
                    template: path.resolve(workingDirectory, "public", "index.pug"),
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
                    title: packageJSON.name || "React",
                    favicon: path.resolve(workingDirectory, "public", "assets", "favicon.ico"),
                }),
            )
        }
    }

    if (vendor) {
        plugins.push(
            new DllReferencePlugin({
                context: vendor,
                manifest: require(path.join(vendor, "vendor.json")),
            }),
        )
    }

    if (!isDevelopment) {
        // https://developers.google.com/web/tools/workbox/guides/codelabs/webpack
        plugins.push(
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
        )

        /** __webpack_hash__ The hash of the compilation available as free var. */
        /** WARNING: Don't combine it with the HotModuleReplacementPlugin. It would break and you don't need it as the HotModuleReplacementPlugin export the same stuff. */
        plugins.push(new ExtendedAPIPlugin())
    }

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
            filename: isDevelopment ? "static/js/[name].bundle.js" : "static/js/[name].[hash:8].js",
            chunkFilename: isDevelopment ? "static/js/[name].chunk.js" : "static/js/[name].[hash:8].chunk.js",
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
                    resource: {
                        test: /\.tsx?$/,
                        not: [/node_modules|\.test.tsx?$/],
                    },
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
        },
        resolveLoader: {
            alias: {
                "custom-loader": path.join(__dirname, "./custom-loader"),
                "prismjs-loader": path.join(__dirname, "./prismjs-loader"),
            },
        },
        plugins,
    }
}
