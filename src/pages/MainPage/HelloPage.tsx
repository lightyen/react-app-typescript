import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { ReactHookCounter } from "components"

interface IProps extends RouteComponentProps {}

export class HelloPage extends React.Component<IProps> {
    public render() {
        console.log(this.props.location)
        return (
            <div>
                <ReactHookCounter />
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
