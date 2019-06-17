import React from "react"
import { RouteComponentProps } from "react-router-dom"
import Button from "~/components/Button"
import { isLogin } from "~/utils/auth"

import { bindActionCreators } from "redux"
import { useSelector, useDispatch } from "react-redux"
import { AppStore } from "~/store"
import { login, logout } from "~/store/auth"
import { getHello } from "~/store/hello"

const actionCreators = {
    login,
    logout,
    getHello,
}

type OwnProps = RouteComponentProps

const Hello: React.FC<OwnProps> = ({ history }) => {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")

    const dispatch = useDispatch()
    const { login, logout, getHello } = React.useMemo(() => bindActionCreators(actionCreators, dispatch), [dispatch])
    const logined = useSelector((state: AppStore) => state.user.logined)
    const status = useSelector((state: AppStore) => state.hello.status)

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

export default Hello

const GoBackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <Button className="d-block" onClick={onClick}>
            Go Back
        </Button>
    )
}
