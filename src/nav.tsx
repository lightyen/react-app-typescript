import React from "react"
import LocaleMessage from "~/components/LocaleMessage"

export interface NavConfigItem {
    /** 標籤名稱 */
    name?: React.ReactNode
    path?: string
    exact?: boolean
    items?: NavConfigItem[]
}

export const navConfig: NavConfigItem[] = [
    { path: "/hello", name: <LocaleMessage id="hello" /> },
    { path: "/highlight", name: <span>代碼高亮</span> },
    {
        path: "/dropdown",
        name: <span>Dropdown</span>,
        items: [
            { path: "/dropdown/1", name: "hello1", exact: true },
            { path: "/dropdown/2", name: "hello2", exact: true },
            { path: "/dropdown/3", name: "hello3", exact: true },
            { path: "/dropdown/4", name: "hello4", exact: true },
            { path: "/dropdown/5", name: "hello5", exact: true },
            { path: "/dropdown/6", name: "hello6", exact: true },
        ],
    },
    { path: "/popper", name: <span>Popper</span> },
    { path: "/threejs", name: <span>three.js</span> },
]
