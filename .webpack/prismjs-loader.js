/**
 * Support Plugins:
 *
 * autolinker, show-invisibles, line-numbers, toolbar, show-language, command-line, diff-highlight
 */

// @ts-check
const path = require("path")
const loaderUtils = require("loader-utils")
const classnames = require("classnames")
const { JSDOM } = require("jsdom")

/** prepare environment */
const { window } = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`)

global["window"] = window
global["self"] = window
global["document"] = window.document
global["getComputedStyle"] = window.getComputedStyle

const Prism = require("prismjs")
const prismComponents = require("prismjs/components")

/**
 * @type {import("webpack").loader.Loader}
 */
exports.default = function(source, sourceMap) {
    const options = loaderUtils.getOptions(this)
    /** ext sheet */
    let extensions = {
        js: "javascript",
        ts: "typescript",
        jsx: "jsx",
        tsx: "tsx",
        go: "go",
        sass: "sass",
        scss: "scss",
        css: "css",
        json: "json",
    }

    let plugins = ["line-numbers", "toolbar", "show-language"]

    extensions = Object.assign(extensions, (options && options.extensions))
    plugins = (options && options.plugins) || plugins
    const data = (options && options.data) || {}
    const diff = options && options.diff
    const diffHighlight = diff && (options.diff.highlight)

    /** load grammars and plugins */
    for (const lang of Object.values(extensions)) {
        // @ts-ignore
        require(`prismjs/components/prism-${lang}`)
    }
    if (diff) {
        // @ts-ignore
        require("prismjs/components/prism-diff")
    }
    for (let j = 0; j < plugins.length; j++) {
        // @ts-ignore
        require(`prismjs/plugins/${plugins[j]}/prism-${plugins[j]}`)
    }
    if (diff) {
        // @ts-ignore
        require(`prismjs/plugins/diff-highlight/prism-diff-highlight`)
    }
    const content = source.toString()
    let ext = path.extname(this.resourcePath)
    if (ext.startsWith(".")) {
        ext = ext.slice(1)
    }
    let language = (options && options.language) || extensions[ext] || ""
    const shell = language === "bash" || language === "powershell"

    /** prepare <pre> */
    const pre = document.createElement("pre")
    pre.className = classnames(!diff && `language-${language}`, {
        "line-numbers": plugins.includes("line-numbers") && !shell,
        "command-line": plugins.includes("command-line") && shell,
    })
    data.language = prismComponents.languages[language].title
    if (shell) {
        if (language === "powershell") {
            pre.setAttribute(`data-prompt`, data["prompt"])
        } else {
            pre.setAttribute(`data-user`, data["user"])
            pre.setAttribute(`data-host`, data["host"])
        }
    }
    delete data["prompt"]
    delete data["user"]
    delete data["host"]
    for (const k in data) {
        if (data.hasOwnProperty(k) && typeof data[k] === "string") {
            pre.setAttribute(`data-${k}`, data[k])
        }
    }

    /** prepare <code> */
    const code = document.createElement("code")
    code.className = classnames(
        !diff && `language-${language}`,
        diff && `language-diff${language && `-${language}`}`,
        diffHighlight && "diff-highlight",
    )
    code.textContent = content

    /** highlight */
    pre.appendChild(code)
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild)
    }
    document.body.appendChild(pre)
    Prism.highlightElement(code, false)

    /** result */
    const output = `module.exports = \`${document.body.innerHTML.replace(/[`$]/g, "\\$&")}\``
    this.callback(null, output)
}
