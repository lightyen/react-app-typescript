import React from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import path from "path"
import LocaleMessage from "~/components/LocaleMessage"

import image from "~/assets/images/256x256.png"
import Button from "~/components/Button"
import styled, { keyframes } from "styled-components"

export const myKeyFrames = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`

const RotateImg = styled.img`
    animation: ${myKeyFrames} 60s infinite;
    animation-timing-function: linear;
`

const Home: React.FC<RouteComponentProps> = ({ match }) => {
    return (
        <div className="fadeIn">
            <div className="row justify-content-around">
                <div className="col-4 row justify-content-center p-2">
                    <RotateImg src={image} width={180} height={180} />
                </div>
            </div>
            <LocaleMessage id="text" values={{}} />
            <p>{`==> Hello React <!-- Fira Code ==>`}</p>
            <Link to={path.join(match.url, "hello")}>
                <Button>Go to /hello</Button>
            </Link>
        </div>
    )
}

export default Home
