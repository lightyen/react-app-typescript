// theme
import "./themes/vscode-like.css"

// plugins styles
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "prismjs/plugins/toolbar/prism-toolbar.css"

// grammars
import "prismjs/components/prism-go"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-scss"
import "prismjs/components/prism-json"

export const tags = {
    go: "Go",
    javascript: "Javascript",
    typescript: "Javascript",
    jsx: "JSX",
    tsx: "TSX",
    scss: "scss",
    json: "json",
}

export type Language = keyof typeof tags

// plugins
import "prismjs/plugins/line-numbers/prism-line-numbers"
import "prismjs/plugins/toolbar/prism-toolbar"
import "prismjs/plugins/show-language/prism-show-language"
