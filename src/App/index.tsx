import React, { useState, useEffect } from "react"
import { createBrowserHistory } from "history"
import { ConnectedRouter } from "connected-react-router"
import AppRouter from "./AppRouter"

// styles
import "bootstrap"
import "@fortawesome/fontawesome-free/js/fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
// import { fas } from "@fortawesome/free-solid-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars"
library.add(faBars)
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
        const locale = "en-US" || navigator.languages[0]
        store.subscribe(() => {
            const state = store.getState()
            if (state.intl.status === SET_LOCALE.SUCCESS) {
                setReady(true)
            }
        })
        store.dispatch(setLocale(locale))
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
