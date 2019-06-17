import React from "react"
import classnames from "classnames"
import Prism from "prismjs"

import { tags, Language } from "./prismjs"

interface OwnProps {
    code: string
    language: Language
}

const CodeHighlight: React.FC<OwnProps> = ({ code, language }) => {
    const ref = React.useRef(null)
    React.useEffect(() => {
        Prism.highlightElement(ref.current, false, () => {})
    })

    return (
        <div className="p-3">
            <pre className={classnames(`language-${language}`, "line-numbers")} data-language={tags[language]}>
                <code ref={ref}>{code}</code>
            </pre>
        </div>
    )
}

export default CodeHighlight
