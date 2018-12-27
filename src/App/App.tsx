import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Provider } from "mobx-react"
import { MainPage } from "../pages"
import { AppStore } from "stores"

interface IProps {}

export class App extends React.Component<IProps> {
    private appStore: AppStore

    constructor(props: IProps) {
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
