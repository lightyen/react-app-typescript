import React from "react"
import { Switch, Route, RouteComponentProps, Link } from "react-router-dom"
import { ReactHookCounter, ReactCounter } from "components"
import path from "path"
import { Button } from "antd"
import { Hello } from "../pages/Hello"

interface IProps extends RouteComponentProps {}

export const Main: React.FC<IProps> = props => {
    const matchUrl = props.match.url
    return (
        <>
            <ReactCounter />
            <ReactHookCounter />
            <Switch>
                <Route path={path.join(matchUrl, "hello")} component={Hello} />
                <Route // this is default for no route
                    render={p => (
                        <Link to={path.join(matchUrl, "hello")}>
                            <Button>Go to /hello</Button>
                        </Link>
                    )}
                />
            </Switch>
        </>
    )
}
