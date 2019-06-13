import React from "react"
import { RouteComponentProps } from "react-router-dom"
import Button from "~/components/Button"
import TimeCounter from "~/components/TimeCounter"
import { isLogin } from "~/utils/auth"

import { Dispatch } from "redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { login, logout } from "~/store/auth"
import { UserStore } from "~/store/user"
import { HelloStore, getHello } from "~/store/hello"
import { User } from "~/store/model"
import { IAppStore } from "~/store"

const dispatchProps = {
    login,
    logout,
    getHello,
}

type DispatchProps = typeof dispatchProps

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(dispatchProps, dispatch)

type PickProps = Pick<UserStore, "logined"> & Pick<HelloStore, "status">
const mapStateToProps = (state: IAppStore, ownProps: OwnProps): PickProps => {
    const { logined } = state.user
    const { status } = state.hello
    return { logined, status }
}

type OwnProps = RouteComponentProps & DispatchProps & PickProps

const Hello: React.FC<OwnProps> = ({ history, status, logined, login, logout, getHello }) => {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")

    return (
        <div className="card bg-transparent">
            <div className="card-body">
                {logined ? (
                    <>
                        <Button onClick={() => getHello()}>Hello API</Button>
                        <span>"{status}"</span>
                        <button className="d-block btn btn-info" onClick={() => logout()}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <form
                            onSubmit={e => {
                                e.preventDefault()
                                login({ username, password })
                            }}
                        >
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    size={16}
                                    placeholder="username: root"
                                    onChange={e => {
                                        setUsername(e.target.value)
                                    }}
                                />
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control mb-3"
                                    size={16}
                                    placeholder="password: helloworld"
                                    onChange={e => {
                                        setPassword(e.target.value)
                                    }}
                                />
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                        <GoBackButton onClick={() => history.goBack()} />
                    </>
                )}
            </div>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Hello)

const GoBackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <Button className="d-block" onClick={onClick}>
            Go Back
        </Button>
    )
}
