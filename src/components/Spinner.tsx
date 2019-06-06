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

export const Spinner = (
    <CircleBorder>
        <Circle>
            <span className="sr-only">Loading</span>
        </Circle>
    </CircleBorder>
)

export const Loading = (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#282c34" }}>
        <CircleBorder>
            <Circle>
                <span className="sr-only">Loading</span>
            </Circle>
        </CircleBorder>
    </div>
)
