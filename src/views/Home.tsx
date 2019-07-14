import React from "react"
import { RouteComponentProps } from "react-router-dom"
import classnames from "classnames"
import LocaleMessage from "~/components/LocaleMessage"
import image from "~/assets/images/256x256.png"
import styled, { keyframes } from "styled-components"

import { useSelector } from "react-redux"
import { RootStore } from "~/store"

export const myKeyFrames = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`

const RotateImg = styled.img`
    animation: ${myKeyFrames} 60s infinite;
    animation-timing-function: linear;
`

function useSelectors() {
    return {
        collapsed: useSelector((state: RootStore) => state.app.collapsed),
    }
}

const Home: React.FC<RouteComponentProps> = ({ match }) => {
    const { collapsed } = useSelectors()
    return (
        <div className="fadeIn">
            <div className="row" style={{ justifyContent: "center", maxWidth: collapsed ? "100%" : "80ch" }}>
                <div className="p-2">
                    <RotateImg src={image} width="180px" height="180px" />
                </div>
            </div>
            <div className="p-0 p-md-3" style={{ maxWidth: "80ch", margin: collapsed ? "auto" : "0" }}>
                <h1>Hello React!</h1>
            </div>
        </div>
    )
}

export default Home
