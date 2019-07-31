/**
 * Tested Plugins:
 *
 * autolinker,
 * show-invisibles,
 * line-numbers,
 * toolbar,
 * show-language,
 * command-line,
 * diff-highlight,
 * data-uri-highlight,
 * line-highlight,
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
global["location"] = window.location
global["getComputedStyle"] = window.getComputedStyle

const Prism = require("prismjs")
const prismComponents = require("prismjs/components")

/**
 * @type {import("webpack").loader.Loader}
 */
exports.default = function(source, sourceMap) {
    this.cacheable
    const options = loaderUtils.getOptions(this) || {}
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
    const {
        language: _language,
        extensions: _extensions,
        plugins: _plugins,
        data: _data,
        diff,
        lineHighlight,
    } = options
    extensions = Object.assign(extensions, _extensions)
    plugins = _plugins || plugins
    const data = _data || {}
    const content = source.toString()
    let ext = path.extname(this.resourcePath)
    if (ext.startsWith(".")) {
        ext = ext.slice(1)
    }
    const language = _language || extensions[ext] || ""

    /** load grammars and plugins */
    for (const lang of Object.values(extensions)) {
        // @ts-ignore
        require(`prismjs/components/prism-${lang}`)
    }
    // @ts-ignore
    require(`prismjs/components/prism-${language}`)
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

    const lineHeight = lineHighlight ? lineHighlight["line-height"] : "21px"
    pre.style.lineHeight = lineHeight

    /** prepare <code> */
    const diffHighlight = diff && (diff.highlight)
    const code = document.createElement("code")
    code.className = classnames(
        !diff && `language-${language}`,
        diff && `language-diff${language && `-${language}`}`,
        diffHighlight && "diff-highlight",
    )

    code.textContent = content.replace(/\\/g, "\\\\")

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
