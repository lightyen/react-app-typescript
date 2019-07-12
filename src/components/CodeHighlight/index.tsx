import React, { useEffect, useRef } from "react"
import classnames from "classnames"
import Prism from "prismjs"

import { tags, Language } from "./prismjs"

interface OwnProps {
    code: string
    language: Language
    className?: string
    style?: React.CSSProperties
}

const CodeHighlight: React.FC<OwnProps> = ({ code, language, className, style }) => {
    const ref = useRef(null)
    useEffect(() => {
        Prism.highlightElement(ref.current, false, () => {})
    })

    return (
        <pre
            style={style}
            className={classnames(className, `language-${language}`, "line-numbers")}
            data-language={tags[language]}
        >
            <code ref={ref}>{code}</code>
        </pre>
    )
}

export default CodeHighlight
