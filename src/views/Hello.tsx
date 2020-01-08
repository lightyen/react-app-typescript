import React from "react"
import { RouteComponentProps } from "react-router-dom"
import Button from "~/components/Button"

import { useSelector, useAction } from "~/store"

const GoBackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <Button className="" onClick={onClick}>
            Go Back
        </Button>
    )
}

function useCustomHook() {
    const [count, setCount] = React.useState(0)
    return { count, setCount }
}

const Hello: React.FC<RouteComponentProps> = ({ history }) => {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const { login, logout } = useAction().auth
    const { getHello } = useAction().hello
    const logined = useSelector(state => state.user.logined)
    const error = useSelector(state => state.user.error)
    const status = useSelector(state => state.hello.status)
    // const { count, setCount } = useCustomHook()

    return (
        <div className="fadeIn">
            <h2 className="p-0 p-md-3">表單輸入</h2>
            <div className="card" style={{ background: "#3b414f" }}>
                <div className="card-body">
                    {/* <button className="btn btn-primary d-flex" onClick={() => setCount(count + 1)}>
                        {count}
                    </button> */}
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
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Hello
