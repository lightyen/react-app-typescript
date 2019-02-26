import React from "react"
import { Switch, Route, RouteComponentProps, Link } from "react-router-dom"
import { ReactCounter } from "components"
import { Counter, ParentComponent } from "components/ReactHooks"
import Button from "components/Button"
import { Hello } from "../pages/Hello"
import path from "path"

interface IProps extends RouteComponentProps {}

export const Main: React.FC<IProps> = props => {
    const matchUrl = props.match.url
    return (
        <>
            <ReactCounter />
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
