import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { getRouteName } from "~/utils/routeName"

const Nav = styled.ul`
    height: 100%;
    background: #101216;
    display: flex;
    flex-direction: column;
`

const NavItem = styled.li`
    transition: background 0.2s, color 0.2s;
    &:hover {
        color: #fff;
        background: #61dafb;
    }
`

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
                    {getRouteName("/hello")}
                </Link>
            </NavItem>
        </Nav>
    )
}
