import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import { MainPage } from "./pages"

export class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={MainPage} />
                </Switch>
            </BrowserRouter>
        )
    }
}
