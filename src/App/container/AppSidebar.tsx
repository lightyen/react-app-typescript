import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Nav = styled.ul`
    height: 100%;
    background: #332f2f;
    display: flex;
    flex-direction: column;
`

const NavItem = styled.li``

export default function AppSidebar() {
    return (
        <Nav className="nav text-light">
            <NavItem className="nav-item text-light active">
                <Link className="nav-link" to="/">
                    Home
                </Link>
            </NavItem>
            <NavItem className="nav-item text-light">
                <Link className="nav-link" to="/hello">
                    Hello
                </Link>
            </NavItem>
        </Nav>
    )
}
