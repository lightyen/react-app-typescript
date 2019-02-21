import React from "react"
import { Provider } from "mobx-react"
import { AppStore } from "stores"
import { AppRouter } from "./AppRouter"
import { hot } from "react-hot-loader/root"

export default hot(App)

function App() {
    const appStore: AppStore = new AppStore()

    React.useEffect(() => {
        document.title = "react-app-typescript"
    })

    return (
        <Provider {...appStore}>
            <AppRouter />
        </Provider>
    )
}
