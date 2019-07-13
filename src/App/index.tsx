import React, { useState, useEffect } from "react"
import { createBrowserHistory } from "history"
import { ConnectedRouter } from "connected-react-router"
import AppRouter from "./AppRouter"

// styles
import "bootstrap"
import "./icons"
import "./scss/style.scss"

// store
import { configureStore } from "~/store"
import { Provider } from "~/components/i18n"

// locale
import { SET_LOCALE, setLocale } from "~/store/i18n"

const history = createBrowserHistory({ basename: process.env.PUBLIC_PATH })
export const store = configureStore(history)

export default function App() {
    useEffect(() => {
        document.title = "react-app-typescript"
    }, [])

    const [ready, setReady] = useState(false)
    useEffect(() => {
        store.subscribe(() => {
            const state = store.getState()
            if (state.intl.status === SET_LOCALE.SUCCESS) {
                setReady(true)
            }
        })
        store.dispatch(setLocale(navigator.languages[0] || "en-US"))
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
