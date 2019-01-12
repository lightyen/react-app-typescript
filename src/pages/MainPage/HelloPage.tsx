import React from "react"
import { RouteComponentProps } from "react-router-dom"

interface IProps extends RouteComponentProps {}

export class HelloPage extends React.Component<IProps> {
    public render() {
        console.log(this.props.location)
        return (
            <div>
                hello world
                <button
                    onClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    Go Back
                </button>
            </div>
        )
    }
}
