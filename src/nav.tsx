import React from "react"
import LocaleMessage from "~/components/LocaleMessage"

type IconType = string

export interface NavConfigNormalItemProps {
    type: "normal"
    name: React.ReactNode
    path?: string
    exact?: boolean
    icon?: IconType
}

export interface NavConfigDropdownItemProps {
    type: "dropdown"
    name: React.ReactNode
    items: NavConfigItemProps[]
    icon?: IconType
}

export interface NavConfigDividerItemProps {
    type: "divider"
}

export interface NavConfigTitleItemProps {
    type: "title"
    name: React.ReactNode
}

export type NavConfigItemProps =
    | NavConfigNormalItemProps
    | NavConfigDropdownItemProps
    | NavConfigDividerItemProps
    | NavConfigTitleItemProps

export const navConfig: NavConfigItemProps[] = [
    { type: "title", name: <span>Title</span> },
    { type: "normal", path: "/hello", name: <LocaleMessage id="hello" />, icon: "fas fa-th-large" },
    { type: "normal", path: "/highlight", name: <span>代碼高亮</span>, icon: "fas fa-hashtag" },
    {
        type: "dropdown",
        name: <span>Dropdown</span>,
        icon: "fas fa-th-large",
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
