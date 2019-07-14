import React from "react"
import { RouteComponentProps, NavLink } from "react-router-dom"
import styled from "styled-components"
import { navConfig } from "~/nav"

const Nav = styled.ul.attrs(props => ({ className: "nav" }))`
    width: 100%;
    height: 100%;
    background: #101216;
    display: flex;
    flex-direction: column;
`

const NavItem = styled.li.attrs(props => ({ className: "nav-item" }))``

const AppNavLink = styled(NavLink).attrs(props => ({ className: "nav-link" }))`
    outline: none;
    color: #f9f9f9;
    transition: background 0.2s, color 0.2s;
    &:hover {
        color: #ffffff;
        background: #51bedb;
    }
    &.active {
        background: #262c33;
    }
    &.active:hover {
        color: #cfcfcf;
        background: #51bedb;
    }
`

const AppSidebar: React.FC<RouteComponentProps> = () => {
    return (
        <Nav>
            {navConfig.map((item, index) => (
                <NavItem key={index}>
                    <AppNavLink to={item.path} exact={item.exact} activeClassName="active">
                        {item.name}
                    </AppNavLink>
                </NavItem>
            ))}
        </Nav>
    )
}

export default AppSidebar
