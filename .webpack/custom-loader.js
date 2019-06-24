// @ts-check
const fs = require("fs")
const fp = require("path")
const loaderUtils = require("loader-utils")

/** @type { import("webpack").loader.Loader } */
module.exports = function(content) {
    this.cacheable && this.cacheable()
    const cb = this.async()

    const options = loaderUtils.getOptions(this)

    // console.log(this.resourcePath)

    cb(null, content)
}
