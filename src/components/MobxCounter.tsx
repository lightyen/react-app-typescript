import React from "react"
import { inject, observer } from "mobx-react"
import { AppStore, IUserStore } from "~/store/mobx"

type IProps = IOwnProps & IUserStore

interface IOwnProps {}

@inject(AppStore.User)
@observer
export class MyCounter extends React.Component<IProps> {
    public render() {
        const { user } = this.props
        return <div>{user.counter}</div>
    }
}
