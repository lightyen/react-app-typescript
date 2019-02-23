import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { MyCounter } from "components"
interface IProps extends RouteComponentProps, IUserStore {}

import { inject, observer } from "mobx-react"
import { AppStore, IUserStore } from "stores"

@inject(AppStore.User)
@observer // Notice that this component will not render again when the user store changed.
export class Hello extends React.Component<IProps> {
    private click = () => {
        this.props.user.setCounter(this.props.user.counter + 1)
    }

    public render() {
        return (
            <div>
                <button onClick={this.click} type="primary">
                    Add
                </button>
                <MyCounter />
                <button
                    onClick={() => {
                        this.props.history.push("/")
                    }}
                >
                    Go Back
                </button>
            </div>
        )
    }
}
