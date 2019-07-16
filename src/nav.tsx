import React from "react"
import LocaleMessage from "~/components/LocaleMessage"
import { BootstrapColors } from "~/components/bootstrap/types"

type IconType = string

interface Badage {
    name: React.ReactNode
    color: BootstrapColors
}

export interface NavConfigNormalItemProps {
    type: "normal"
    name: React.ReactNode
    path?: string
    exact?: boolean
    icon?: IconType
    badge?: Badage
}

export interface NavConfigDropdownItemProps {
    type: "dropdown"
    name: React.ReactNode
    items: NavConfigItem[]
    icon?: IconType
    badge?: Badage
}

export interface NavConfigDividerItemProps {
    type: "divider"
}

export interface NavConfigTitleItemProps {
    type: "title"
    name: React.ReactNode
}

export type NavConfigItem =
    | NavConfigNormalItemProps
    | NavConfigDropdownItemProps
    | NavConfigDividerItemProps
    | NavConfigTitleItemProps

type NavConfig = NavConfigItem | NavConfigItem[]

/** 全域管理 navigation */
export const navConfig: NavConfig = [
    { type: "title", name: <span>Test</span> },
    { type: "normal", path: "/hello", name: <LocaleMessage id="hello" />, icon: "fas fa-th-large" },
    {
        type: "normal",
        path: "/highlight",
        name: <span>代碼高亮</span>,
        icon: "fas fa-hashtag",
        badge: {
            name: "HOT",
            color: "danger",
        },
    },
    {
        type: "dropdown",
        name: <span>Dropdown</span>,
        icon: "fas fa-th-large",
        badge: {
            name: "HOT",
            color: "danger",
        },
        items: [
            {
                type: "normal",
                name: "hello1",
                badge: {
                    name: "COLD",
                    color: "primary",
                },
            },
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
