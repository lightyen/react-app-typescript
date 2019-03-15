import React from "react"
import { Provider } from "mobx-react"
import { AppStore } from "~stores"
import AppRouter from "./AppRouter"

export default function App() {
    const appStore: AppStore = new AppStore()

    React.useEffect(() => {
        document.title = "react-app-typescript"
        // from Webpack EnvironmentPlugin
        // console.log(process.env.NODE_ENV)
    })

    return (
        <Provider {...appStore}>
            <AppRouter />
        </Provider>
    )
}
