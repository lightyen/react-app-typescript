import React from "react"
import Prism from "prismjs"
import classnames from "classnames"

import { tags, Language } from "./prismjs"

interface OwnProps {
    code: string
    language: Language
}

const CodeHighlight: React.FC<OwnProps> = ({ code, language }) => {
    const ref = React.useRef(null)
    React.useEffect(() => {
        Prism.highlightElement(ref.current, false, () => {})
    }, [code, language])

    return (
        <pre data-language={tags[language]} className={classnames(`language-${language}`, "line-numbers")}>
            <code ref={ref}>{code}</code>
        </pre>
    )
}

export default CodeHighlight
