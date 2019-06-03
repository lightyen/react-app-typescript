import React from "react"
import { createHashHistory } from "history"
import { ConnectedRouter } from "connected-react-router"

import "./scss/style.scss"
import "bootstrap"

import AppRouter from "./AppRouter"

// store
import { configureStore } from "~/store"
import { Provider } from "~/components/i18n"

// locale
import { setLocale } from "~/store/i18n"

export default function App() {
    React.useEffect(() => {
        document.title = "react-app-typescript"
    }, [])

    const [history] = React.useState(() => createHashHistory())
    const [ready, setReady] = React.useState(false)
    const [store] = React.useState(() => configureStore(history))

    React.useEffect(() => {
        const locale = "en-US" || navigator.languages[0]
        setLocale(locale)(store.dispatch, null, null).then(() => {
            setReady(true)
        })
    }, [])

    return (
        ready && (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <AppRouter />
                </ConnectedRouter>
            </Provider>
        )
    )
}
