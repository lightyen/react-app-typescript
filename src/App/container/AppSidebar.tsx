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

const NavDropdown = styled.ul.attrs<{ open: boolean }>(({ open }) => ({
    className: "nav",
    style: {
        maxHeight: `${open ? "1500" : "0"}px`,
        opacity: `${open ? "1.0" : "0.6"}`,
    },
}))<{
    open: boolean
}>`
    width: 100%;
    background: #101216;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    overflow: hidden;
    position: relative;
    transition: max-height 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.4s ease;
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

const AppNavNoLink = styled.a.attrs(props => ({ className: classnames("nav-link", props.className) }))`
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

const NavDropdownItemLink = styled.a.attrs(props => ({ className: classnames("nav-link", props.className) }))`
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

const NavDropdownItem: React.FC<{ name: React.ReactNode; items: NavConfigItem[]; className?: string }> = ({
    name,
    items,
    className,
}) => {
    const [open, setOpen] = useState(false)
    return (
        <NavItem>
            <NavDropdownItemLink
                className={className}
                href=""
                onClick={e => {
                    e.preventDefault()
                    setOpen(!open)
                }}
            >
                {name}
                <NavDropdownCaret open={open}>
                    <i className="fas fa-caret-down" />
                </NavDropdownCaret>
            </NavDropdownItemLink>
            <NavDropdown open={open}>
                {items.map((item, i) => {
                    switch (item.type) {
                        case "normal":
                            return (
                                <NavItem key={i} style={{ position: "relative", paddingLeft: "0.75rem" }}>
                                    {item.path ? (
                                        <AppNavLink to={item.path} exact={item.exact} activeClassName="active">
                                            {item.icon && item.icon.startsWith("fa") && (
                                                <i className={classnames(item.icon, "mr-3")} />
                                            )}
                                            {item.name}
                                        </AppNavLink>
                                    ) : (
                                        <AppNavNoLink
                                            href=""
                                            onClick={e => {
                                                e.preventDefault()
                                            }}
                                        >
                                            {item.name}
                                        </AppNavNoLink>
                                    )}
                                </NavItem>
                            )
                        case "dropdown":
                            return <NavDropdownItem key={i} name={item.name} items={item.items} />
                        case "divider":
                            return <NavDividerItem key={i} />
                    }
                })}
            </NavDropdown>
        </NavItem>
    )
}

const NavDropdownCaret = styled.div.attrs<{ open: boolean }>(({ open }) => ({
    style: {
        transform: open ? "rotate(0deg)" : "rotate(90deg)",
    },
}))<{ open: boolean }>`
    transition: transform 0.2s;
`

const NavDividerItem = styled.li`
    width: 100%;
    height: 0.5rem;
    background: #242e40;
`

const AppSidebar: React.FC<RouteComponentProps> = () => {
    return (
        <Nav>
            {navConfig.map((item, i) => {
                switch (item.type) {
                    case "normal":
                        return (
                            <NavItem key={i}>
                                {item.path ? (
                                    <AppNavLink to={item.path} exact={item.exact} activeClassName="active">
                                        {item.icon && item.icon.startsWith("fa") && (
                                            <i className={classnames(item.icon, "mr-3")} />
                                        )}
                                        {item.name}
                                    </AppNavLink>
                                ) : (
                                    <AppNavNoLink
                                        href=""
                                        onClick={e => {
                                            e.preventDefault()
                                        }}
                                    >
                                        {item.icon && item.icon.startsWith("fa") && (
                                            <i className={classnames(item.icon, "mr-3")} />
                                        )}
                                        {item.name}
                                    </AppNavNoLink>
                                )}
                            </NavItem>
                        )
                    case "dropdown":
                        return <NavDropdownItem key={i} name={item.name} items={item.items} />
                    case "divider":
                        return <NavDividerItem key={i} />
                }
            })}
        </Nav>
    )
}

export default AppSidebar
