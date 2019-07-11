import React from "react"
import { RouteProps, Redirect, Route, Switch } from "react-router-dom"
import { Loading } from "~/components/Spinner"

import { hot } from "react-hot-loader/root"

const isAuthenticated = (): boolean => {
    return true // get localstorage token
}

const AuthenticatedRoute: React.FC<RouteProps> = ({ render, ...rest }) => (
    <Route {...rest} render={props => (isAuthenticated() ? render(props) : <Redirect to="/login" />)} />
)

interface ReactModule<T> {
    default: React.ComponentType<T>
}

function Async<T>(module: Promise<ReactModule<T>>, delay?: number) {
    if (delay > 0) {
        return React.lazy(
            () =>
                new Promise<ReactModule<T>>(resolve => {
                    window.setTimeout(() => resolve(module), delay)
                }),
        )
    }
    return React.lazy(() => module)
}

const NoAuthenticatedRoute: React.FC<RouteProps> = ({ render, ...rest }) => (
    <Route {...rest} render={props => (!isAuthenticated() ? render(props) : <Redirect to="/" />)} />
)

const NotFound = Async(import("~/views/NotFound"))
const AppLayout = Async(import("~/App/container/AppLayout"))

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
