import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Provider } from "mobx-react"
import { MainPage } from "../pages"
import { AppStore } from "stores"

export default class App extends React.Component<{}> {
    private appStore: AppStore

    constructor(props: {}) {
        super(props)
        this.appStore = new AppStore()
    }

    public render() {
        return (
            <Provider {...this.appStore}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={MainPage} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}
