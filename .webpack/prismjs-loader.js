// @ts-check
const path = require("path")
const loaderUtils = require("loader-utils")
const classnames = require("classnames")
const { JSDOM } = require("jsdom")
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

    let resource = {
        js: "javascript",
        ts: "typescript",
        jsx: "jsx",
        tsx: "tsx",
        go: "go",
        sass: "sass",
        scss: "scss",
        css: "css",
        json: "json",
        sh: "bash",
        ps1: "powershell",
    }

    let plugins = ["line-numbers", "toolbar", "show-language"]

    resource = (options && options.resource) || resource
    plugins = (options && options.plugins) || plugins
    const data = (options && options.data) || {}

    for (let j = 0; j < plugins.length; j++) {
        // @ts-ignore
        require(`prismjs/plugins/${plugins[j]}/prism-${plugins[j]}`)
    }

    for (const lang of Object.values(resource)) {
        // @ts-ignore
        require(`prismjs/components/prism-${lang}`)
    }

    const content = source.toString()
    const ext = path.extname(this.resourcePath)
    let lang = ext
    if (lang.startsWith(".")) {
        lang = lang.slice(1)
    }
    const language = resource[lang]

    const pre = document.createElement("pre")
    const shell = language === "bash" || language === "powershell"

    pre.className = classnames({
        "line-numbers": plugins.includes("line-numbers") && !shell,
        "command-line": plugins.includes("command-line") && shell,
    })
    if (shell) {
        if (language === "powershell") {
            pre.setAttribute(`data-prompt`, data["prompt"])
        } else {
            pre.setAttribute(`data-user`, data["user"])
            pre.setAttribute(`data-host`, data["host"])
        }
        delete data["prompt"]
        delete data["user"]
        delete data["host"]
        for (const k in data) {
            if (data.hasOwnProperty(k) && typeof data[k] === "string") {
                pre.setAttribute(`data-${k}`, data[k])
            }
        }
    }
    pre.setAttribute("data-language", prismComponents.languages[language].title)
    const code = document.createElement("code")
    code.className = `language-${language}`
    code.textContent = content

    pre.appendChild(code)
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild)
    }
    document.body.appendChild(pre)

    Prism.highlightElement(code, false)
    this.callback(null, `module.exports = \`${document.body.innerHTML.replace(/[`$]/g, "\\$&")}\``)
}
