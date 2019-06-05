import React from "react"
import { RouteProps, Redirect, Route, Switch, RouteComponentProps } from "react-router-dom"
import { Loading } from "~/components/Spinner"
import NotFound from "~/views/pages/NotFound"
import { hot } from "react-hot-loader/root"

const isAuthenticated = (): boolean => {
    return true // get localstorage token
}

const AuthenticatedRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />)} />
)

const NoAuthenticatedRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (!isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />)} />
)

function AsyncComponent(C: React.LazyExoticComponent<React.ComponentType<any>>) {
    return (props: RouteComponentProps) => (
        <React.Suspense fallback={Loading}>
            <C {...props} />
        </React.Suspense>
    )
}

const AppLayout = AsyncComponent(React.lazy(() => import("~/App/container/AppLayout")))

const AppRouter: React.FC = () => {
    return (
        <Switch>
            <Route path="/404" component={NotFound} exact />
            <AuthenticatedRoute path="/" component={AppLayout} />
        </Switch>
    )
}

export default hot(AppRouter)
