import React from "react"
import { RouteComponentProps } from "react-router-dom"
import image from "$/assets/images/256x256.png"
import styled, { keyframes } from "styled-components"

import { useSelector } from "~/store"

export const myKeyFrames = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`

const RotateImg = styled.img`
    animation: ${myKeyFrames} 60s infinite;
    animation-timing-function: linear;
`

const Home: React.FC<RouteComponentProps> = () => {
    const collapsed = useSelector(state => state.app.collapsed)
    return (
        <div className="fadeIn">
            <div className="row" style={{ justifyContent: "center", maxWidth: collapsed ? "100%" : "80ch" }}>
                <div className="p-2">
                    <RotateImg src={image} width="180px" height="180px" alt="react" />
                </div>
            </div>
            <div
                className="px-0 px-md-5"
                style={{
                    maxWidth: "80ch",
                    margin: collapsed ? "auto" : "0",
                    transition: "padding 0.25s ease",
                }}
            >
                <h1>Hello React!</h1>
            </div>
        </div>
    )
}

export default Home
