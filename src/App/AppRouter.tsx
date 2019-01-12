import React from "react"
import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom"
import { MainPage } from "../pages"

interface IProps {}

export class AppRouter extends React.Component<IProps> {
    public render() {
        return (
            <HashRouter>
                <Route path="/" component={MainPage} />
            </HashRouter>
        )
    }
}
