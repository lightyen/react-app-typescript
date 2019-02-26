import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { MyCounter } from "components"
import Button from "components/Button"
import { inject, observer } from "mobx-react"
import { AppStore, IUserStore } from "stores"

interface IProps extends RouteComponentProps, IUserStore {}

@inject(AppStore.User)
@observer // Notice that this component will not render again when the user store changed.
export class Hello extends React.Component<IProps> {
    private click = () => {
        this.props.user.setCounter(this.props.user.counter + 1)
    }

    public render() {
        return (
            <div>
                <Button onClick={this.click}>Add</Button>
                <MyCounter />
                <Button
                    onClick={() => {
                        this.props.history.push("/")
                    }}
                >
                    Go Back
                </Button>
            </div>
        )
    }
}
