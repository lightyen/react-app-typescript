import React from "react"
import { Switch, Route, RouteComponentProps, Link } from "react-router-dom"

import image from "~/assets/images/256x256.png"
import Button from "~/components/Button"
import styled, { keyframes } from "styled-components"

import { LocaleMessage } from "~/locale/utils"

// 組件懶加載：https://reactjs.org/docs/code-splitting.html
import { Suspense } from "react"
const Hello = React.lazy(() => import("~/views/Hello"))

function WaitingComponent<P = any>(Component: React.FunctionComponent<P>) {
    return (props: P) => (
        <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    )
}

export const myKeyFrames = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`

const RotateImg = styled.img`
    animation: ${myKeyFrames} 5s infinite;
    animation-timing-function: linear;
`

interface IProps extends RouteComponentProps {}

const Main: React.FC<IProps> = props => {
    const { match } = props
    return (
        <div className="container">
            <div className="row justify-content-around">
                <div className="col-4 row justify-content-center p-2">
                    <RotateImg src={image} width={180} height={180} />
                </div>
            </div>
            <LocaleMessage id="text" values={{}} />
            <p>{`==> Hello React <!-- Fira Code ==>`}</p>
            <Switch>
                <Route path={`${match.url}/hello`} component={WaitingComponent(Hello)} />
                <Route
                    render={p => (
                        <Link to={`${match.url}/hello`}>
                            <Button>Go to /hello</Button>
                        </Link>
                    )}
                />
            </Switch>
        </div>
    )
}

export default Main
