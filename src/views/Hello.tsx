import React from "react"
import { RouteComponentProps } from "react-router-dom"
import MyCounter from "~/components/Example/ReduxCounter"
import Button from "~/components/Button"
import TimeCounter from "~/components/TimeCounter"

import { Dispatch } from "redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { getHello } from "~/store/saga/hello/action"
import { getUser, setUser } from "~/store/user/action"
import { IUser } from "~/store/model"
import { HelloStore } from "~/store/saga/hello/reducer"
import { IAppStore } from "~/store"

const dispatchProps = {
    getHello,
}

type DispatchProps = typeof dispatchProps

interface OwnProps {}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(dispatchProps, dispatch)

type PickProps = Partial<Pick<HelloStore, "status">>
const mapStateToProps = (state: IAppStore, ownProps: OwnProps): PickProps => {
    const { status } = state.hello
    return { status }
}

type Props = RouteComponentProps & DispatchProps & PickProps & OwnProps

class Hello extends React.Component<Props> {
    public render() {
        const { history, status } = this.props
        const { getHello } = this.props
        return (
            <div>
                <Button onClick={() => getHello()}>Hello API</Button>
                <span>"{status}"</span>
                <MyCounter />
                <input
                    size={16}
                    placeholder="input..."
                    onChange={e => {
                        const user: IUser = { name: e.target.value, age: 22 }
                        setUser(user)
                    }}
                />
                <GoBackButton onClick={() => history.goBack()} />
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Hello)

const GoBackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return <Button onClick={onClick}>Go Back</Button>
}
