import React from "react"
import path from "path"
import { RouteProps } from "react-router-dom"
import LocaleMessage from "~/components/LocaleMessage"
import Loadable from "react-loadable"

// 懶加載：https://reactjs.org/docs/code-splitting.html
const Main = React.lazy(() => import("~/views/Main"))
const Hello = React.lazy(() => import("~/views/Hello"))
const Highlight = React.lazy(() => import("~/views/Highlight"))
const Popper = React.lazy(() => import("~/views/Popper"))

interface RouteItem extends RouteProps {
    name: React.ReactNode
}

const routes: RouteItem[] = [
    { path: "/", name: <span>Home</span>, exact: true, component: Main },
    { path: "/hello", name: <LocaleMessage id="hello" />, component: Hello },
    { path: "/highlight", name: <span>Highlight</span>, component: Highlight },
    { path: "/popper", name: <span>Popper</span>, component: Popper },
]

export default routes

export function getRouteName(url: string): React.ReactNode {
    const r = routes.find(i => i.path === url)
    if (r) {
        return r.name
    }
    return path.basename(url)
}
