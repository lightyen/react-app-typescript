import React, { MouseEventHandler } from "react"

import * as style from "./Example.scss"

interface IProps {
    value: string
    onClick: MouseEventHandler
}

export class Example extends React.Component<Partial<IProps>> {
    private static defaultProps: Partial<IProps> = {
        value: "hello world",
    }

    public render() {
        return (
            <button className={style.example} onClick={this.props.onClick}>
                <span>{this.props.value}</span>
            </button>
        )
    }
}

export const ExampleSFC: React.SFC<IProps> = ({ value = "hello world", onClick }) => {
    return (
        <button className={style.example} onClick={onClick}>
            <span>{value}</span>
        </button>
    )
}
