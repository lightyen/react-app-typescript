import React, { useState } from "react"
import { RouteComponentProps, NavLink } from "react-router-dom"
import styled from "styled-components"
import classnames from "classnames"
import { navConfig, NavConfigItemProps, NavConfigNormalItemProps, NavConfigDropdownItemProps } from "~/nav"

interface NavigationProps {
    dropdown?: boolean
    open?: boolean
}

const Navigation = styled.ul.attrs<NavigationProps>(({ dropdown, open }) => ({
    className: "nav",
    style: dropdown
        ? {
              flexWrap: "nowrap",
              overflow: "hidden",
              position: "relative",
              transition: "max-height 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.4s ease",
              maxHeight: open ? "1500px" : "0px",
              opacity: open ? 1.0 : 0.6,
          }
        : {
              height: "100%",
          },
}))<NavigationProps>`
    width: 100%;
    background: #101216;
    display: flex;
    flex-direction: column;
`

const NavNormalItem: React.FC<{ item: NavConfigNormalItemProps }> = ({ item }) => {
    return (
        <li className="nav-item">
            {item.path ? (
                <AppNavLink to={item.path} exact={item.exact} activeClassName="active">
                    {item.icon && item.icon.startsWith("fa") && <i className={classnames(item.icon, "mr-3")} />}
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
        </li>
    )
}

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

const NavDropdownLink = styled.a.attrs(props => ({ className: classnames("nav-link", props.className) }))`
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

const NavDividerItem = styled.li`
    width: 100%;
    height: 0.5rem;
    background: #242e40;
`

const NavDropdownCaret = styled.div.attrs<{ open: boolean }>(({ open }) => ({
    style: {
        transform: open ? "rotate(0deg)" : "rotate(90deg)",
    },
}))<{ open: boolean }>`
    transition: transform 0.2s;
`

const NavItem: React.FC<{ item: NavConfigItemProps }> = ({ item }) => {
    switch (item.type) {
        case "normal":
            return <NavNormalItem item={item} />
        case "dropdown":
            return <NavDropdownItem {...item} />
        case "divider":
            return <NavDividerItem />
    }
}

const NavDropdownItem: React.FC<NavConfigDropdownItemProps> = ({ name, items, icon }) => {
    const [open, setOpen] = useState(false)
    return (
        <li className="nav-item">
            <NavDropdownLink
                href=""
                onClick={e => {
                    e.preventDefault()
                    setOpen(!open)
                }}
            >
                {icon && icon.startsWith("fa") && <i className={classnames(icon, "mr-3")} />}
                {name}
                <div className="flex-grow-1 d-flex justify-content-end">
                    <NavDropdownCaret open={open}>
                        <i className="fas fa-caret-down" />
                    </NavDropdownCaret>
                </div>
            </NavDropdownLink>
            <Navigation dropdown open={open}>
                {items.map((item, i) => (
                    <NavItem key={i} item={item} />
                ))}
            </Navigation>
        </li>
    )
}

const AppNavigation: React.FC<{ items: NavConfigItemProps | NavConfigItemProps[] }> = ({ items }) => {
    return Array.isArray(items) ? (
        <Navigation>
            {items.map((item, i) => (
                <NavItem key={i} item={item} />
            ))}
        </Navigation>
    ) : (
        <NavItem item={items} />
    )
}

const AppSidebar: React.FC<RouteComponentProps> = () => {
    return <AppNavigation items={navConfig} />
}

export default AppSidebar
