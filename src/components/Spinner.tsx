import React from "react"
import styled, { keyframes } from "styled-components"

// https://codepen.io/AlexWarnes/pen/jXYYKL

const spin = keyframes`
from {
    transform: rotate(0);
  }
  to{
    transform: rotate(360deg);
  }
`

const Circle = styled.div`
    width: 100%;
    height: 100%;
    background-color: #282c34;
    border-radius: 50%;
`

const CircleBorder = styled.div`
    width: 150px;
    height: 150px;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: rgb(63, 249, 220);
    background: linear-gradient(0deg, rgba(63, 249, 220, 0.1) 33%, rgba(63, 249, 220, 1) 100%);
    animation: ${spin} 0.8s linear 0s infinite;
`

const loading0 = keyframes`
    0%,
    80%,
    100% {
        box-shadow: 0 2.5em 0 -1rem;
    }
    40% {
        box-shadow: 0 2.5em 0 0;
    }
`

const Loading0 = styled.div`
    &,
    &::after,
    &::before {
        border-radius: 50%;
        width: 2.5em;
        height: 2.5em;
        animation-fill-mode: both;
        animation: ${loading0} 1.2s infinite ease-in-out;
    }

    color: #ffffff;
    font-size: 10px;
    margin: 80px auto;
    position: relative;
    text-indent: -9999em;
    transform: translateZ(0);
    animation-delay: -0.16s;

    &::after,
    &::before {
        content: "";
        position: absolute;
        top: 0;
    }

    &::before {
        left: -3rem;
        animation-delay: -0.16s;
    }
    &::after {
        left: 3rem;
        animation-delay: 0.16s;
    }
`

export const Loading = (
    <div className="d-flex justify-content-center align-items-center h-100" style={{ background: "#282c34" }}>
        <Loading0 />
        {/* <CircleBorder>
            <Circle>
                <span className="sr-only">Loading</span>
            </Circle>
        </CircleBorder> */}
    </div>
)
