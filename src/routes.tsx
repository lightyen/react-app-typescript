import React, { Suspense } from "react"
import path from "path"
import { RouteProps } from "react-router-dom"
import LocaleMessage from "~/components/LocaleMessage"

// 懶加載：https://reactjs.org/docs/code-splitting.html
const Main = React.lazy(() => import("~/views/Main"))
const Hello = React.lazy(() => import("~/views/Hello"))
const Highlight = React.lazy(() => import("~/views/Highlight"))

function WaitingComponent<P>(Component: React.FunctionComponent<P>) {
    return (props: P) => (
        <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    )
}

interface RouteItem extends RouteProps {
    name: React.ReactNode
}

const routes: RouteItem[] = [
    { path: "/", name: <span>Home</span>, exact: true, component: Main },
    { path: "/hello", name: <LocaleMessage id="hello" />, component: Hello },
    { path: "/highlight", name: <span>Highlight</span>, component: Highlight },
]

export default routes

export function getRouteName(url: string): React.ReactNode {
    const r = routes.find(i => i.path === url)
    if (r) {
        return r.name
    }
    return path.basename(url)
}
