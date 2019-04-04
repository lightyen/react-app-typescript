import React from "react"

import styled from "styled-components"

const Footer = styled.footer`
    background: #20232a;
    height: 50px;
`

export default function AppFooter() {
    return (
        <Footer className="container-fluid d-flex align-items-center text-light">
            <a href="https://github.com/lightyen/react-app-typescript">this repo</a>
        </Footer>
    )
}
