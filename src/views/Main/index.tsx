import React from "react"
import { Switch, Route, RouteComponentProps, Link } from "react-router-dom"
import url from "url"
import image from "~assets/256x256.png"
import Button from "~/components/Button"

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
    const { match } = props
    return (
        <div className="">
            <p>{`==> Hello React <!-- Fira Code ==>`}</p>
            <img src={image} width={64} />
            <Switch>
                <Route path={url.resolve(match.url, "hello")} component={WaitingComponent(Hello)} />
                <Route
                    render={p => (
                        <Link to={url.resolve(match.url, "hello")}>
                            <Button>Go to /hello</Button>
                        </Link>
                    )}
                />
            </Switch>
        </div>
    )
}

export default Main
