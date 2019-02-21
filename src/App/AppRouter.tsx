import React from "react"
import { BrowserRouter, HashRouter, Route } from "react-router-dom"
import { Main } from "../pages/Main"

export function AppRouter() {
    return (
        <HashRouter>
            <Route path="/" component={Main} />
        </HashRouter>
    )
}
