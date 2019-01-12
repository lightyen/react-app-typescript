import React from "react"
import { inject, observer } from "mobx-react"
import { AppStore, IStore } from "stores"

interface ICounterProps extends IStore {}

@inject(AppStore.User)
@observer // Notice that when the user store change will trigger this component rendering.
export class MyCounter extends React.Component<ICounterProps> {
    public render() {
        return <div>{this.props.user.counter}</div>
    }
}
