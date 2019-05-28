import React from "react"

import style from "./Example.css"

interface OwnProps {
    content?: string
    onClick?: React.MouseEventHandler
}

export class Example extends React.Component<OwnProps> {
    private static defaultProps: OwnProps = {
        content: "helloworld",
    }

    public render() {
        const { onClick, content } = this.props
        return (
            <button className={style.example} onClick={onClick}>
                <span>{content}</span>
            </button>
        )
    }
}

export const ExampleFC: React.FC<OwnProps> = ({ content, onClick }) => (
    <button className={style.example} onClick={onClick}>
        <span>{content}</span>
    </button>
)

ExampleFC.defaultProps = { content: "helloworld" }

// NOTE: @deprecated
// export const ExampleSFC: React.SFC<OwnProps> = ({ value = "hello world", onClick }) => {
//     return (
//         <button className={style.example} onClick={onClick}>
//             <span>{value}</span>
//         </button>
//     )
// }
