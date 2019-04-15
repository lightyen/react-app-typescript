import React from "react"
import { RouteComponentProps } from "react-router-dom"
import MyCounter from "~/components/Example/ReduxCounter"
import Button from "~/components/Button"
import TimeCounter from "~/components/TimeCounter"

import { Dispatch } from "redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { getUser, setUser } from "~/store/user/action"
import { IUser } from "~/store/model"

const dispatchProps = {
    getUser,
    setUser,
}

type DispatchProps = typeof dispatchProps

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ getUser, setUser }, dispatch)

type IProps = RouteComponentProps & DispatchProps

class Hello extends React.Component<IProps> {
    public render() {
        const { history, getUser, setUser } = this.props

        return (
            <div>
                <Button onClick={() => getUser()}>Add</Button>
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
    null,
    mapDispatchToProps,
)(Hello)

const GoBackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return <Button onClick={onClick}>Go Back</Button>
}
