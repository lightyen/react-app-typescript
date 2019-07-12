import React from "react"
import path from "path"
import { RouteProps } from "react-router-dom"
import LocaleMessage from "~/components/LocaleMessage"

// https://reactjs.org/docs/code-splitting.html
const Home = React.lazy(() => import("~/views/Home"))
const Hello = React.lazy(() => import("~/views/Hello"))
const Highlight = React.lazy(() => import("~/views/Highlight"))
const Popper = React.lazy(() => import("~/views/Popper"))
const ThreeDemo = React.lazy(() => import("~/views/ThreeDemo"))

interface RouteItem extends RouteProps {
    name: React.ReactNode
}

const routes: RouteItem[] = [
    { path: "/", exact: true, name: <span>Home</span>, component: Home },
    { path: "/hello", exact: true, name: <LocaleMessage id="hello" />, component: Hello },
    { path: "/highlight", exact: true, name: <span>Highlight</span>, component: Highlight },
    { path: "/popper", exact: true, name: <span>Popper</span>, component: Popper },
    { path: "/threejs", exact: true, name: <span>three.js</span>, component: ThreeDemo },
]

export default routes

export function getRouteName(url: string): React.ReactNode {
    const r = routes.find(i => i.path === url)
    if (r) {
        return r.name
    }
    return path.basename(url)
}
