import React from "react"
import { BrowserRouter, HashRouter, Route } from "react-router-dom"
import Main from "~/views/Main"

import { hot } from "react-hot-loader/root"

export default hot(AppRouter)

function AppRouter() {
    return (
        <HashRouter>
            <Route path="/" component={Main} />
        </HashRouter>
    )
}
