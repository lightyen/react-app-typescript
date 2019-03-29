import React from "react"

import style from "./Example.css"

interface IProps {
    content: string
    onClick: React.MouseEventHandler
}

export class Example extends React.Component<Partial<IProps>> {
    private static defaultProps: Partial<IProps> = {
        content: "hello world",
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

export const ExampleFC: React.FunctionComponent<IProps> = ({ content: value = "hello world", onClick }) => (
    <button className={style.example} onClick={onClick}>
        <span>{value}</span>
    </button>
)

// NOTE: @deprecated
// export const ExampleSFC: React.SFC<IProps> = ({ value = "hello world", onClick }) => {
//     return (
//         <button className={style.example} onClick={onClick}>
//             <span>{value}</span>
//         </button>
//     )
// }
