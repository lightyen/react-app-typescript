import React from "react"
import { Example } from "./Example"

interface IProps {}

interface IState {
    count: number
}

export class ReactCounter extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props)
        this.state = { count: 1 }
    }
    private handleClick = () => {
        this.setState(prev => ({ ...prev, count: this.state.count + 1 }))
    }
    public render() {
        return (
            <div>
                <Example content="Class Style Component" onClick={this.handleClick} />
                <span>{this.state.count}</span>
            </div>
        )
    }
}
