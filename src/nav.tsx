import React from "react"
import LocaleMessage from "~/components/LocaleMessage"

interface NavNormalItem {
    type: "normal"
    name: React.ReactNode
    path?: string
    exact?: boolean
    icon?: string
}

interface NavDropdownItem {
    type: "dropdown"
    name: React.ReactNode
    items: NavConfigItem[]
    icon?: string
}

interface NavDividerItem {
    type: "divider"
}

export type NavConfigItem = NavNormalItem | NavDropdownItem | NavDividerItem

export const navConfig: NavConfigItem[] = [
    { type: "normal", path: "/hello", name: <LocaleMessage id="hello" />, icon: "fas fa-th-large" },
    { type: "normal", path: "/highlight", name: <span>代碼高亮</span>, icon: "fas fa-hashtag" },
    {
        type: "dropdown",
        name: <span>Dropdown</span>,
        items: [
            { type: "normal", name: "hello1" },
            { type: "normal", name: "hello2" },
            { type: "normal", name: "hello3" },
            { type: "normal", name: "hello4" },
            { type: "normal", name: "hello5" },
            { type: "normal", name: "hello6" },
            { type: "divider" },
        ],
    },
    { type: "normal", path: "/popper", name: <span>Popper</span> },
    { type: "normal", path: "/threejs", name: <span>three.js</span> },
]
