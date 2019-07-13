import React from "react"
import LocaleMessage from "~/components/LocaleMessage"

interface NavConfigItem {
    /** 標籤名稱 */
    name?: React.ReactNode
    path?: string
    exact?: boolean
}

export const navConfig: NavConfigItem[] = [
    { path: "/hello", name: <LocaleMessage id="hello" /> },
    { path: "/highlight", name: <span>代碼高亮</span> },
    { path: "/popper", name: <span>Popper</span> },
    { path: "/threejs", name: <span>three.js</span> },
]
