import React from "react"

import { LocaleMessage } from "~/locale/utils"
import styled from "styled-components"

const Footer = styled.footer`
    background: #6d6d6d;
    height: 50px;
`

export default function AppFooter() {
    return (
        <Footer className="container-fluid d-flex align-items-center text-light">
            <LocaleMessage id="text" values={{}} />
        </Footer>
    )
}
