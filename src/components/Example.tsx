import React from "react"

import style from "./Example.scss"

interface IProps {
    content: string
    onClick: React.MouseEventHandler
}

export class Example extends React.Component<Partial<IProps>> {
    private static defaultProps: Partial<IProps> = {
        content: "hello world",
    }

    public render() {
        return (
            <button className={style.example} onClick={this.props.onClick}>
                <span>{this.props.content}</span>
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
