import React from "react"
import { inject, observer } from "mobx-react"
import { AppStore, IUserStore } from "stores"

interface ICounterProps extends IUserStore {}

@inject(AppStore.User)
@observer // Notice that when the user store change will trigger this component rendering.
export class MyCounter extends React.Component<ICounterProps> {
    public render() {
        return <div>{this.props.user.counter}</div>
    }
}
