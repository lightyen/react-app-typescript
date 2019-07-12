import React from "react"
import LocaleMessage from "~/components/LocaleMessage"

interface NavConfigItem {
    /** 標籤名稱 */
    name?: React.ReactNode
    path?: string
    exact?: boolean
}

export const navConfig: NavConfigItem[] = [
    { path: "/", name: <span>Home</span>, exact: true },
    { path: "/hello", name: <LocaleMessage id="hello" /> },
    { path: "/highlight", name: <span>Highlight</span> },
    { path: "/popper", name: <span>Popper</span> },
    { path: "/threejs", name: <span>Three</span> },
]
