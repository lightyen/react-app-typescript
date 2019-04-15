import React from "react"

import { IAppStore } from "~/store"
import { IUserStore } from "~/store/user"
import { connect } from "react-redux"

interface IOwnProps {}

type StateProps = Partial<Pick<IUserStore, "currentUser">>
const mapStateToProps = (state: IAppStore, ownProps: IOwnProps): StateProps => ({ currentUser: state.user.currentUser })

type IProps = IOwnProps & StateProps

class MyCounter extends React.Component<IProps> {
    public constructor(props: IProps) {
        super(props)
    }
    public render() {
        const { currentUser } = this.props
        return <div>{currentUser.name}</div>
    }
}

export default connect(mapStateToProps)(MyCounter)
