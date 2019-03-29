import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { MyCounter } from "~/components/ReduxCounter"
import Button from "~/components/Button"
import TimeCounter from "~/components/TimeCounter"

import { ActionCreatorsMapObject, Dispatch } from "redux"
import { IUserThunkAction } from "~/store/user/action"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { getUser, setUser } from "~/store/user/action"
import { IUser } from "~/store/user/model"

interface DispatchProps extends ActionCreatorsMapObject<IUserThunkAction> {
    getUser: typeof getUser
    setUser: typeof setUser
}

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators<IUserThunkAction, DispatchProps>({ getUser, setUser }, dispatch)

interface IOwnProps {}

@(connect(
    null,
    mapDispatchToProps,
) as any)
export default class Hello extends React.Component<IOwnProps & RouteComponentProps & DispatchProps> {
    public render() {
        const { history, getUser, setUser } = this.props
        return (
            <div>
                <Button onClick={() => getUser()}>Add</Button>
                <MyCounter />
                <TimeCounter />
                <input
                    size={16}
                    placeholder="input..."
                    onChange={e => {
                        const user: IUser = { name: e.target.value, age: 22 }
                        setUser(user)
                    }}
                />
                <GoBackButton onClick={() => history.push("/")} />
            </div>
        )
    }
}

const GoBackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return <Button onClick={onClick}>Go Back</Button>
}
