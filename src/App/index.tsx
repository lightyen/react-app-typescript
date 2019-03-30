import React from "react"
import AppRouter from "./AppRouter"

// Redux
import { configureStore } from "~/store"
import { Provider } from "~/components/i18n"

import "bootstrap"
import "bootstrap/scss/bootstrap.scss"
import "./scss/App.scss"

export default function App() {
    React.useEffect(() => {
        document.title = "react-app-typescript"
        // from Webpack EnvironmentPlugin
        // console.log(process.env.NODE_ENV)
    })

    return (
        <Provider store={configureStore()}>
            <AppRouter />
        </Provider>
    )
}
