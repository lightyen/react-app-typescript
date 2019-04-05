import React from "react"
import { Route, Switch } from "react-router-dom"
import AppLayout from "./container/AppLayout"

import { hot } from "react-hot-loader/root"
import NotFound from "~/views/pages/NotFound"

const AppRouter: React.FC = props => {
    return (
        <Switch>
            <Route path="/404" component={NotFound} exact />
            <Route path="/" component={AppLayout} />
        </Switch>
    )
}

export default hot(AppRouter)
