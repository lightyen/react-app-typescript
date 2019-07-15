import React from "react"
import { RouteComponentProps } from "react-router-dom"
import CodeHighlight from "~/components/CodeHighlight"

const input = `import React from "react"

const CodeHighlight: React.FC<OwnProps> = ({ code, language }) => {
    const ref = React.useRef(null)
    React.useEffect(() => {
        Prism.highlightElement(ref.current, false, () => {
            console.log("change")
        })
    })

    return (
        <pre
            data-language={tags[language]}
            className={classnames(\`language-\${language}\`, "line-numbers")}
        >
            <code ref={ref}>{code}</code>
        </pre>
    )
}
`

interface OwnProps extends RouteComponentProps {}

const Highlight: React.FC<OwnProps> = ({ history }) => {
    return (
        <div className="fadeIn">
            <div className="p-0 p-md-3">
                <h2>代碼高亮</h2>
            </div>
            <CodeHighlight className="mb-3" code={input} language="tsx" />
            {/* <Button onClick={() => history.push("/")}>Go Home</Button> */}
        </div>
    )
}

export default Highlight
