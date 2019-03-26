import React from "react"
import { Switch, Route, RouteComponentProps, Link } from "react-router-dom"
import url from "url"
import image from "~assets/256x256.png"
import Button from "~/components/Button"

import style from "./index.css"

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
        <div className={style.myfont}>
            <p> == Hello React =></p>
            <img src={image} width={64} />
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
        </div>
    )
}

export default Main
