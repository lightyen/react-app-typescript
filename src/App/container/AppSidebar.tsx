import React, { useState } from "react"
import { RouteComponentProps, NavLink } from "react-router-dom"
import styled from "styled-components"
import classnames from "classnames"
import { navConfig, NavConfigItem } from "~/nav"

const Nav = styled.ul.attrs(props => ({ className: "nav" }))`
    width: 100%;
    height: 100%;
    background: #101216;
    display: flex;
    flex-direction: column;
`

const NavDropdown = styled.ul.attrs<{ open: boolean }>(props => ({ className: "nav", open: props.open }))<{
    open: boolean
}>`
    width: 100%;
    background: #101216;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    overflow: hidden;
    ${props => (props.open ? "max-height: 1500px; opacity: 1.0;" : "max-height: 0; opacity: 0;")}
    transition: max-height 0.3s ease-in-out, opacity 0.5s ease-in-out;
`

const NavItem = styled.li.attrs(props => ({ className: "nav-item" }))``

const AppNavLink = styled(NavLink).attrs(props => ({ className: classnames("nav-link", props.className) }))`
    outline: none;
    color: #f9f9f9;
    transition: background 0.2s, color 0.2s;
    &:hover {
        color: #2b3445;
        background: #51bedb;
    }
    &.active {
        background: #262c33;
    }
    &.active:hover {
        color: #2b3445;
        background: #51bedb;
    }
`

const NavDropdownItem: React.FC<{ name: React.ReactNode; items: NavConfigItem[] }> = ({ name, items }) => {
    const [open, setOpen] = useState(false)
    return (
        <li className="nav-item">
            <NavDropdownItemLink onClick={() => setOpen(!open)}>
                <span>{name}</span>
                <NavDropdownCaret open={open}>
                    <i className="fas fa-caret-down" />
                </NavDropdownCaret>
            </NavDropdownItemLink>
            <NavDropdown open={open}>
                {items.map((item, i) => (
                    <NavItem key={i} style={{ position: "relative", paddingLeft: "0.75rem" }}>
                        <AppNavLink to={item.path} exact={item.exact} activeClassName="active">
                            {item.name}
                        </AppNavLink>
                    </NavItem>
                ))}
            </NavDropdown>
        </li>
    )
}

const NavDropdownItemLink = styled.a.attrs(props => ({ className: "nav-link" }))`
    outline: none;
    color: #f9f9f9;
    transition: background 0.2s, color 0.2s;
    &:hover {
        color: #2b3445;
        background: #51bedb;
    }
    &.active {
        background: #262c33;
    }
    &.active:hover {
        color: #2b3445;
        background: #51bedb;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const NavDropdownCaret = styled.div<{ open: boolean }>`
    transition: transform 0.2s;
    ${props => (props.open ? "" : "transform: rotate(90deg);")}
`

const AppSidebar: React.FC<RouteComponentProps> = () => {
    return (
        <Nav>
            {navConfig.map((item, index) => {
                if (item.items) {
                    return (
                        <NavDropdownItem key={index} name={"Dropdown"} items={item.items} />
                        // <NavItem key={index}>
                        //     <AppNavLink to={item.path} exact={item.exact} activeClassName="active">
                        //         {item.name}
                        //     </AppNavLink>
                        // </NavItem>
                    )
                } else {
                    return (
                        <NavItem key={index}>
                            <AppNavLink to={item.path} exact={item.exact} activeClassName="active">
                                {item.name}
                            </AppNavLink>
                        </NavItem>
                    )
                }
            })}
        </Nav>
    )
}

export default AppSidebar
