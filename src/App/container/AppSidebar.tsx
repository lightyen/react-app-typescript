import React, { useState } from "react"
import { RouteComponentProps, NavLink as RrNavLink } from "react-router-dom"
import styled from "styled-components"
import classnames from "classnames"
import {
    navConfig,
    NavConfigItem,
    NavConfigNormalItemProps,
    NavConfigDropdownItemProps,
    NavConfigTitleItemProps,
    NavConfigDividerItemProps,
} from "~/nav"

interface NavItemProps {
    dropdown?: boolean
    open?: boolean
}

const NaviItem = styled.ul.attrs<NavItemProps>(({ dropdown, open }) => ({
    className: "nav",
    style: dropdown
        ? {
              flexWrap: "nowrap",
              overflow: "hidden",
              position: "relative",
              transition: "max-height 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95), opacity 0.4s ease",
              maxHeight: open ? "1500px" : "0px",
              opacity: open ? 1.0 : 0.7,
          }
        : {
              height: "100%",
          },
}))<NavItemProps>`
    width: 100%;
    background: #101216;
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

const NavLink = styled(RrNavLink).attrs(props => ({ className: classnames("nav-link", props.className) }))`
    outline: none;
    color: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
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

const NavTitleItem: React.FC<NavConfigTitleItemProps> = ({ name }) => {
    return <NavTitle>{name}</NavTitle>
}

const NavNormalItem: React.FC<NavConfigNormalItemProps> = ({ name, path, exact, icon, badge }) => {
    const content = (
        <>
            {icon && icon.startsWith("fa") && <i className={classnames(icon, "mr-3")} />}
            <div className="flex-grow-1 d-flex justify-content-start">{name}</div>
            {badge && <span className={classnames("badge", "badge-" + badge.color)}>{badge.name}</span>}
        </>
    )

    return (
        <NavNormal>
            {path ? (
                <NavLink to={path} exact={exact} activeClassName="active">
                    {content}
                </NavLink>
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
                {icon && icon.startsWith("fa") && <i className={classnames(icon, "mr-3")} />}
                <div className="flex-grow-1 d-flex justify-content-start">{name}</div>
                {badge && <span className={classnames("mr-3 badge", "badge-" + badge.color)}>{badge.name}</span>}
                <div className="flex-grow-0 d-flex justify-content-end">
                    <NavDropdownCaret open={open}>
                        <i className="fas fa-caret-down" />
                    </NavDropdownCaret>
                </div>
            </NavLink>
            <NaviItem dropdown open={open}>
                {items.map((item, i) => (
                    <NavIntermediateItem key={i} item={item} />
                ))}
            </NaviItem>
        </li>
    )
}

const AppNavigation: React.FC<{ items: NavConfigItem | NavConfigItem[] }> = ({ items }) => {
    return Array.isArray(items) ? (
        <NaviItem>
            {items.map((item, i) => (
                <NavIntermediateItem key={i} item={item} />
            ))}
        </NaviItem>
    ) : (
        <NavIntermediateItem item={items} />
    )
}

const AppSidebar: React.FC<RouteComponentProps> = () => {
    return <AppNavigation items={navConfig} />
}

export default AppSidebar
