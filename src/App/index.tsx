import React from "react"
import { Provider } from "mobx-react"
import { AppStore } from "stores"
import { AppRouter } from "./AppRouter"

export default class App extends React.Component<{}> {
    private appStore: AppStore

    constructor(props: {}) {
        super(props)
        this.appStore = new AppStore()
    }

    public render() {
        return (
            <Provider {...this.appStore}>
                <AppRouter />
            </Provider>
        )
    }
}
