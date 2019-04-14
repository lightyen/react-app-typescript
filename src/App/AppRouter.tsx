import React from "react"
import { RouteProps, Redirect, Route, Switch } from "react-router-dom"
import AppLayout from "./container/AppLayout"

import { hot } from "react-hot-loader/root"
import NotFound from "~/views/pages/NotFound"

const isAuthenticated = (): boolean => {
    return true
}

const AuthenticatedRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />)} />
)

const NoAuthenticatedRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (!isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />)} />
)

const AppRouter: React.FC = () => {
    return (
        <Switch>
            <Route path="/404" component={NotFound} exact />
            <AuthenticatedRoute path="/" component={AppLayout} />
        </Switch>
    )
}

export default hot(AppRouter)
