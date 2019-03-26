import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { MyCounter } from "~/components/ReduxCounter"
import Button from "~/components/Button"
import TimeCounter from "~/components/TimeCounter"

import { ActionCreatorsMapObject, Dispatch } from "redux"
import { IUserThunkAction } from "~/store/redux/user/action"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { getUser, setUser } from "~/store/redux/user/action"
import { IUser } from "~/store/redux/user/model"

interface DispatchProps extends ActionCreatorsMapObject<IUserThunkAction> {
    getUser: typeof getUser
    setUser: typeof setUser
}

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators<IUserThunkAction, DispatchProps>({ getUser, setUser }, dispatch)

interface IOwnProps {}

// import { inject, observer } from "mobx-react"
// import { AppStore, IUserStore } from "~store/mobx"
// @inject(AppStore.User)
@(connect(
    null,
    mapDispatchToProps,
) as any)
export default class Hello extends React.Component<IOwnProps & RouteComponentProps & DispatchProps> {
    private click = () => {
        // this.props.user.setCounter(this.props.user.counter + 1)
        this.props.getUser()
    }

    public render() {
        return (
            <div>
                <Button onClick={this.click}>Add</Button>
                <MyCounter />
                <TimeCounter />
                <input
                    size={16}
                    placeholder="input..."
                    onChange={e => {
                        const user: IUser = { name: e.target.value, age: 22 }
                        this.props.setUser(user)
                    }}
                />
                <GoBackButton
                    onClick={() => {
                        this.props.history.push("/")
                    }}
                />
            </div>
        )
    }
}

function GoBackButton(props: { onClick: () => void }) {
    return <Button onClick={props.onClick}>Go Back</Button>
}
