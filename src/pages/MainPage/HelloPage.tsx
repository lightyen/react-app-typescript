import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { MyCounter } from "components"
interface IProps extends RouteComponentProps, IUserStore {}

import { inject, observer } from "mobx-react"
import { AppStore, IUserStore } from "stores"
import { Button } from "antd"
@inject(AppStore.User)
@observer // Notice that this component will not render again when the user store changed.
export class HelloPage extends React.Component<IProps> {
    private click = () => {
        this.props.user.setCounter(this.props.user.counter + 1)
    }

    public render() {
        console.log(this.props.location)
        return (
            <div>
                <Button onClick={this.click} type="primary">
                    Add
                </Button>
                <MyCounter />
                <Button
                    onClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    Go Back
                </Button>
            </div>
        )
    }
}