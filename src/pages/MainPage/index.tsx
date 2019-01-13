import React, { Fragment, Component } from "react"
import { Switch, Route, RouteComponentProps, Redirect, Link } from "react-router-dom"
import { Example, ReactHookCounter } from "components"
import { inject, observer } from "mobx-react"
import { AppStore, IStore } from "stores"
import { HelloPage } from "./HelloPage"
import { MyCounter } from "components"
import path from "path"

interface IProps extends RouteComponentProps, IStore {}

@inject(AppStore.User)
@observer // Notice that this component will not render again when the user store changed.
export class MainPage extends Component<IProps> {
    private click = () => {
        this.props.user.setCounter(this.props.user.counter + 1)
    }

    public render() {
        return (
            <Fragment>
                <Example value="Hello World!" onClick={this.click} />
                <MyCounter />
                <Switch>
                    <Route path={path.join(this.props.match.url, "hello")} component={HelloPage} />
                    {/* this is default for no route */}
                    <Route>
                        <Link to={path.join(this.props.match.url, "hello")}>Link</Link>
                    </Route>
                </Switch>
            </Fragment>
        )
    }
}
