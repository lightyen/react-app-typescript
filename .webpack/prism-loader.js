// @ts-check
const path = require("path")
const loaderUtils = require("loader-utils")

const { JSDOM } = require("jsdom")
const { window } = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`)
global["window"] = window
global["self"] = window
global["document"] = window.document
global["getComputedStyle"] = window.getComputedStyle

const Prism = require("prismjs")
const prismComponents = require("prismjs/components")

// @ts-check
const mySupportlanguages = {
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

const plugins = ["line-numbers", "toolbar", "show-language"]

for (let j = 0; j < plugins.length; j++) {
    // @ts-ignore
    require(`prismjs/plugins/${plugins[j]}/prism-${plugins[j]}`)
}

for (const lang of Object.values(mySupportlanguages)) {
    // @ts-ignore
    require(`prismjs/components/prism-${lang}`)
}

/**
 * @type {import("webpack").loader.Loader}
 */
exports.default = function(source, sourceMap) {
    const options = loaderUtils.getOptions(this)

    const content = source.toString()
    const ext = path.extname(this.resourcePath)
    let lang = ext
    if (lang.startsWith(".")) {
        lang = lang.slice(1)
    }
    const language = mySupportlanguages[lang]

    const pre = document.createElement("pre")
    pre.className = "line-numbers"
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
    const es = `export default \`${document.body.innerHTML.replace(/[`${}]/g, "\\$&")}\``
    this.callback(null, es)
}
