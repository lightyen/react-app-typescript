import React from "react"
import LocaleMessage from "~/components/LocaleMessage"

interface NavNormalItem {
    type: "normal"
    name: React.ReactNode
    path: string
    exact?: boolean
}

interface NavDropdownItem {
    type: "dropdown"
    name: React.ReactNode
    items: NavConfigItem[]
}

interface NavDividerItem {
    type: "divider"
}

export type NavConfigItem = NavNormalItem | NavDropdownItem | NavDividerItem

export const navConfig: NavConfigItem[] = [
    { type: "normal", path: "/hello", name: <LocaleMessage id="hello" /> },
    { type: "normal", path: "/highlight", name: <span>代碼高亮</span> },
    {
        type: "dropdown",
        name: <span>Dropdown</span>,
        items: [
            { type: "normal", path: "/dropdown/1", name: "hello1", exact: true },
            { type: "normal", path: "/dropdown/2", name: "hello2", exact: true },
            { type: "normal", path: "/dropdown/3", name: "hello3", exact: true },
            { type: "normal", path: "/dropdown/4", name: "hello4", exact: true },
            { type: "normal", path: "/dropdown/5", name: "hello5", exact: true },
            { type: "normal", path: "/dropdown/6", name: "hello6", exact: true },
            { type: "divider" },
        ],
    },
    { type: "normal", path: "/popper", name: <span>Popper</span> },
    { type: "normal", path: "/threejs", name: <span>three.js</span> },
]
