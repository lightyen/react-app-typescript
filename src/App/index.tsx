import React from "react"
import { Provider } from "mobx-react"
import { AppStore } from "stores"
import { AppRouter } from "./AppRouter"

class App extends React.Component {
    private appStore: AppStore

    constructor(props: {}) {
        super(props)
        this.appStore = new AppStore()
    }

    public componentDidMount() {
        document.title = "react-app-typescript"
    }

    public render() {
        return (
            <Provider {...this.appStore}>
                <AppRouter />
            </Provider>
        )
    }
}

import { hot } from "react-hot-loader/root"
export default hot(App)
