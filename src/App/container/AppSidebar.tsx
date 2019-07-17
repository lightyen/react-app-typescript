import React, { useState } from "react"
import { RouteComponentProps, NavLink as RrNavLink } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import classnames from "classnames"
import {
    NavConfigItem,
    NavConfigNormalItemProps,
    NavConfigDropdownItemProps,
    NavConfigTitleItemProps,
    NavConfigDividerItemProps,
    Badge,
    Icon,
} from "./navigation"
import { navConfig } from "~/nav"

interface NavItemProps {
    dropdown?: boolean
    open?: boolean
}

const NavItem = styled.ul.attrs<NavItemProps>(({ dropdown, open }) => ({
    className: "nav flex-nowrap",
    style: dropdown
        ? {
              flexWrap: "nowrap",
              overflow: "hidden",
              position: "relative",
              transition: "max-height 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95), opacity 0.4s ease",
              maxHeight: open ? "1500px" : "0px",
              opacity: open ? 1.0 : 0.7,
              backgroundColor: "#161a20",
          }
        : {
              height: "100%",
              background: "#101216",
          },
}))<NavItemProps>`
    width: 100%;
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
        "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
`

const NavDropdownCaret = styled.div.attrs<{ open: boolean }>(({ open }) => ({
    style: {
        transform: open ? "rotate(0deg)" : "rotate(90deg)",
    },
}))<{ open: boolean }>`
    transition: transform 0.2s;
`

const anime01 = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(60deg);}
`

const NavLink = styled(RrNavLink).attrs(({ className }) => ({
    className: classnames("nav-link", className),
    style: {
        display: "flex",
        flexDirection: "row",
        padding: "0.75rem 1rem",
    },
}))`
    color: #f8f9fa;
    outline: none;
    justify-content: space-between;
    align-items: center;
    transition: background 0.2s, color 0.2s;
    &.active {
        background: #262c33;
    }
    &:hover,
    &.active:hover {
        color: #f8f9fa;
        background: #2d323d;
    }
    &:hover svg[class~="fa-react"] {
        animation: ${anime01} 10s infinite;
        animation-timing-function: ease;
    }
`

const NavTitle = styled.li.attrs(props => ({ className: "nav-item" }))`
    font-size: 1rem;
    padding: 0.75rem 0.5rem;
    text-transform: uppercase;
`

const NavNormal = styled.li.attrs(props => ({ className: "nav-item" }))``

const NavDivider = styled.li.attrs({ className: "nav-item" })`
    width: 100%;
    height: 0.5rem;
    background: #242e40;
`

const BootstrapBadge: React.FC<Badge & { dropdown?: boolean }> = ({ pill, name, color, dropdown, render }) => {
    const c = color || "secondary"
    const classes = classnames("badge", pill && "badge-pill", "badge-" + c, dropdown && "mr-3")
    const defaultItem: React.FC = ({ children }) => <span className={classes}>{children}</span>

    return render ? render({ children: name, className: classes }) : defaultItem({ children: name })
}

const IconItem: React.FC<Icon> = ({ fa, material: MaterialIcon, render }) => {
    const defaultItem: React.FC = ({ children }) => <div className="mr-3">{children}</div>
    const r = render || defaultItem
    if (fa) {
        return r({ children: <i className={fa} /> })
    } else if (MaterialIcon) {
        return r({ children: <MaterialIcon /> })
    } else {
        return r({ children: null })
    }
}

const NavTitleItem: React.FC<NavConfigTitleItemProps> = ({ name }) => {
    return <NavTitle>{name}</NavTitle>
}

const NavNormalItem: React.FC<NavConfigNormalItemProps> = ({ name, path, exact, icon, badge, custom }) => {
    const content = (
        <>
            {icon && <IconItem {...icon} />}
            <div className="flex-grow-1 d-flex justify-content-start">{name}</div>
            {badge && <BootstrapBadge {...badge} />}
        </>
    )

    return (
        <NavNormal>
            {path ? (
                <NavLink to={path} exact={exact} activeClassName="active">
                    {content}
                </NavLink>
            ) : custom ? (
                name
            ) : (
                <NavLink
                    to=""
                    onClick={e => {
                        e.preventDefault()
                    }}
                >
                    {content}
                </NavLink>
            )}
        </NavNormal>
    )
}

const NavDividerItem: React.FC<NavConfigDividerItemProps> = () => {
    return <NavDivider />
}

const NavIntermediateItem: React.FC<{ item: NavConfigItem }> = ({ item }) => {
    switch (item.type) {
        case "title":
            return <NavTitleItem {...item} />
        case "normal":
            return <NavNormalItem {...item} />
        case "dropdown":
            return <NavDropdownItem {...item} />
        case "divider":
            return <NavDividerItem {...item} />
    }
}

const NavDropdownItem: React.FC<NavConfigDropdownItemProps> = ({ name, items, icon, badge }) => {
    const [open, setOpen] = useState(false)
    return (
        <li className="nav-item">
            <NavLink
                to=""
                onClick={e => {
                    e.preventDefault()
                    setOpen(!open)
                }}
            >
                {icon && <IconItem {...icon} />}
                <div className="flex-grow-1 d-flex justify-content-start">{name}</div>
                {badge && <BootstrapBadge {...badge} dropdown />}
                <div className="flex-grow-0 d-flex justify-content-end">
                    <NavDropdownCaret open={open}>
                        <i className="fas fa-caret-down" />
                    </NavDropdownCaret>
                </div>
            </NavLink>
            <NavItem dropdown open={open}>
                {items.map((item, i) => (
                    <NavIntermediateItem key={i} item={item} />
                ))}
            </NavItem>
        </li>
    )
}

const AppNavigation: React.FC<{ items: NavConfigItem | NavConfigItem[] }> = ({ items }) => {
    return Array.isArray(items) ? (
        <NavItem>
            {items.map((item, i) => (
                <NavIntermediateItem key={i} item={item} />
            ))}
        </NavItem>
    ) : (
        <NavIntermediateItem item={items} />
    )
}

const AppSidebar: React.FC<RouteComponentProps> = () => {
    return <AppNavigation items={navConfig} />
}

export default AppSidebar
