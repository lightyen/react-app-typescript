import React from "react"
import { RouteProps, Redirect, Route, Switch } from "react-router-dom"
import { Loading } from "~/components/Spinner"
import AsyncComponent from "~/utils/async"

import { hot } from "react-hot-loader/root"

const isAuthenticated = (): boolean => {
    return true // get localstorage token
}

const AuthenticatedRoute: React.FC<RouteProps> = ({ render, ...rest }) => (
    <Route {...rest} render={props => (isAuthenticated() ? render(props) : <Redirect to="/login" />)} />
)

const NoAuthenticatedRoute: React.FC<RouteProps> = ({ render, ...rest }) => (
    <Route {...rest} render={props => (!isAuthenticated() ? render(props) : <Redirect to="/" />)} />
)

const NotFound = AsyncComponent(import("~/views/NotFound"))
const AppLayout = AsyncComponent(import("~/layout/Layout"))

const AppRouter: React.FC = () => {
    return (
        <React.Suspense fallback={Loading}>
            <Switch>
                <Route path="/404" render={props => <NotFound {...props} />} />
                <AuthenticatedRoute path="/" render={props => <AppLayout {...props} />} />
            </Switch>
        </React.Suspense>
    )
}

export default hot(AppRouter)
