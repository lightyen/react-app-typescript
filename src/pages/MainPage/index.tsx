import React, { Fragment, Component } from "react"
import { Switch, Route, RouteComponentProps, Link } from "react-router-dom"
import { ReactHookCounter, ReactCounter } from "components"

import { HelloPage } from "./HelloPage"
import path from "path"
import { Button } from "antd"

interface IProps extends RouteComponentProps {}

export class MainPage extends Component<IProps> {
    public render() {
        const matchUrl = this.props.match.url

        return (
            <Fragment>
                <ReactCounter />
                <ReactHookCounter />
                <Switch>
                    <Route path={path.join(matchUrl, "hello")} component={HelloPage} />
                    {/* this is default for no route */}
                    <Route>
                        <Link to={path.join(matchUrl, "hello")}>
                            <Button>Go to hello</Button>
                        </Link>
                    </Route>
                </Switch>
            </Fragment>
        )
    }
}
