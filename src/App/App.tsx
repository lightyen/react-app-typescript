import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import { MainPage } from "../pages"

export class App extends React.Component {

    private isDevelopment(): boolean {
        if (document.getElementById("this-is-for-development-node")) {
            return true
        }
        return false
    }

    public render() {
        console.log(this.isDevelopment())
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={MainPage} />
                </Switch>
            </BrowserRouter>
        )
    }
}
