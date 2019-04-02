import React from "react"
import AppRouter from "./AppRouter"

// Redux
import { configureStore } from "~/store"
import { Provider } from "~/components/i18n"

import "bootstrap"
import "bootstrap/scss/bootstrap.scss"
import "./scss/App.scss"
import { setLocale } from "~/store/i18n"

export default function App() {
    const [ready, setReady] = React.useState(false)
    React.useEffect(() => {
        document.title = "react-app-typescript"
        // from Webpack EnvironmentPlugin
        // console.log(process.env.NODE_ENV)
    })

    const store = configureStore()

    React.useEffect(() => {
        ;(async () => {
            const locale = navigator.languages[0]
            await setLocale(locale)(store.dispatch, null, null)
            setReady(true)
        })()
    })

    return ready ? (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    ) : null
}
