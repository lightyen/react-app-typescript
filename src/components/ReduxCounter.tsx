import React from "react"

import { IAppStore } from "~/store"
import { IUserStore } from "~/store/user"
import { connect } from "react-redux"

type IProps = IOwnProps & PickProps

interface IOwnProps {}

type PickProps = Partial<Pick<IUserStore, "currentUser">>
const mapStateToProps = (state: IAppStore, ownProps: IOwnProps): PickProps => ({ currentUser: state.user.currentUser })

@(connect(
    mapStateToProps,
    null,
) as any)
export class MyCounter extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props)
    }
    public render() {
        const { currentUser } = this.props
        return <div>{currentUser.name}</div>
    }
}
