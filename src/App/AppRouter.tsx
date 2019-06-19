import React from "react"
import { RouteProps, Redirect, Route, Switch, RouteComponentProps } from "react-router-dom"
import Loadable from "react-loadable"
import { Loading } from "~/components/Spinner"
import NotFound from "~/views/pages/NotFound"
import { hot } from "react-hot-loader/root"
import { setConfig, cold } from "react-hot-loader"

const isAuthenticated = (): boolean => {
    return true // get localstorage token
}

const AuthenticatedRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />)} />
)

const NoAuthenticatedRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (!isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />)} />
)

function AsyncComponent(C: React.LazyExoticComponent<React.ComponentType<RouteComponentProps>>) {
    return (props: RouteComponentProps) => (
        <React.Suspense fallback={Loading}>
            <C {...props} />
        </React.Suspense>
    )
}

// const AppLayout = AsyncComponent(React.lazy(() => import("~/App/container/AppLayout")))
const AppLayout = Loadable({
    loader: () => import("~/App/container/AppLayout"),
    loading: () => Loading,
})

const AppRouter: React.FC = () => {
    return (
        <Switch>
            <Route path="/404" component={NotFound} />
            <AuthenticatedRoute path="/" component={AppLayout} />
        </Switch>
    )
}

// FIXME: fix react-hot-loader with react-redux
setConfig({
    onComponentCreate: (type, name) =>
        (String(type).indexOf("useDispatch") > 0 ||
            String(type).indexOf("useSelector") > 0 ||
            String(type).indexOf("useStore") > 0) &&
        cold(type),
})

export default process.env.NODE_ENV === "development" ? hot(AppRouter) : AppRouter
