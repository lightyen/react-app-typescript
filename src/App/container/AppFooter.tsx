import React from "react"

import styled from "styled-components"

const Footer = styled.div`
    background: #20232a;
    height: 50px;
`

const Github = styled.i.attrs(props => ({
    className: "fab fa-github fa-2x",
}))`
    color: #6e767d;
    transition: color 0.16s ease-out;
    &:hover {
        color: #9ccfff;
    }
`

export default function AppFooter() {
    return (
        <Footer className="container-fluid d-flex align-items-center justify-content-between text-light">
            <a href="https://github.com/lightyen/react-app-typescript" target="_blank">
                <Github />
            </a>
            <span>Made by lightyen</span>
        </Footer>
    )
}
