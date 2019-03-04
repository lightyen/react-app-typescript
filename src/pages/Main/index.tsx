import React from "react"
import { Switch, Route, RouteComponentProps, Link } from "react-router-dom"
import { ReactCounter } from "components"
import { Counter, ParentComponent } from "components/ReactHooks"
import Button from "components/Button"
// import Hello from "../pages/Hello"
import url from "url"

// 組件懶加載：https://reactjs.org/docs/code-splitting.html
import { Suspense } from "react"
const Hello = React.lazy(() => import("../pages/Hello"))

function WaitingComponent<P = any>(Component: React.FunctionComponent<P>) {
    return (props: P) => (
        <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    )
}

interface IProps extends RouteComponentProps {}

const Main: React.FC<IProps> = props => {
    const matchUrl = props.match.url
    return (
        <>
            <ReactCounter />
            <Switch>
                <Route path={url.resolve(matchUrl, "hello")} component={WaitingComponent(Hello)} />
                <Route // this is default for no route
                    render={p => (
                        <Link to={url.resolve(matchUrl, "hello")}>
                            <Button>Go to /hello</Button>
                        </Link>
                    )}
                />
            </Switch>
        </>
    )
}

export default Main
