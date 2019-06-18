import React from "react"
import { RouteComponentProps } from "react-router-dom"
import Button from "~/components/Button"
import { isLogin } from "~/utils/auth"

import { bindActionCreators, Dispatch } from "redux"
import { connect, useDispatch, useSelector } from "react-redux"
import { AppStore } from "~/store"
import { UserStore } from "~/store/user"
import { HelloStore } from "~/store/hello"
import { login, logout } from "~/store/auth"
import { getHello } from "~/store/hello"

const GoBackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <Button className="d-block" onClick={onClick}>
            Go Back
        </Button>
    )
}

const actionCreators = { login, logout, getHello }
type DispatchProps = typeof actionCreators
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch)

type StateProps = Pick<UserStore, "logined" | "error"> & Pick<HelloStore, "status">
const mapStateToProps = (state: AppStore) => {
    return {
        logined: state.user.logined,
        error: state.user.error,
        status: state.hello.status,
    }
}

function useActions() {
    const dispatch = useDispatch()
    return React.useMemo(() => bindActionCreators(actionCreators, dispatch), [dispatch])
}

function useSelectors() {
    return {
        logined: useSelector((state: AppStore) => state.user.logined),
        error: useSelector((state: AppStore) => state.user.error),
        status: useSelector((state: AppStore) => state.hello.status),
    }
}

type OwnProps = RouteComponentProps

type Props = OwnProps & DispatchProps & StateProps

function CustomHooks() {
    const [count, setCount] = React.useState(2)
    return { count, setCount }
}

const Hello: React.FC<Props> = ({ history, ...rest }) => {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")

    const { login, logout, getHello } = rest
    const { logined, status, error } = rest

    const { count, setCount } = CustomHooks()
    // const { login, logout, getHello } = useActions()
    // const { logined, status, error } = useSelectors()

    React.useEffect(() => {
        console.log("mount")
        return () => {
            console.log("unmount")
        }
    }, [])

    return (
        <div className="card bg-transparent">
            <div onClick={() => setCount(count + 1)}>{count} Add Count</div>
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
                                {error && <div>{error["message"]}</div>}
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
