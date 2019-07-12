import React from "react"
import { RouteComponentProps, NavLink } from "react-router-dom"
import styled from "styled-components"
import { navConfig } from "~/nav"

const Nav = styled.ul.attrs({ className: "nav" })`
    height: 100%;
    background: #101216;
    display: flex;
    flex-direction: column;
`

const NavItem = styled.li.attrs({ className: "nav-item" })``

const AppNavLink = styled(NavLink).attrs({ className: "nav-link" })`
    outline: none;
    color: #f9f9f9;
    transition: background 0.2s, color 0.2s;
    &:hover {
        color: #0066ff;
        background: #61dafb;
    }
    &.active {
        background: #20262d;
    }
`

const AppSidebar: React.FC<RouteComponentProps> = () => {
    return (
        <Nav>
            {navConfig.map((c, index) => (
                <NavItem key={index}>
                    <AppNavLink to={c.path} exact={c.exact} activeClassName="active">
                        {c.name}
                    </AppNavLink>
                </NavItem>
            ))}
        </Nav>
    )
}

export default AppSidebar
