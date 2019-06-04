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
import { SET_LOCALE, setLocale } from "~/store/i18n"

const history = createHashHistory()
export const store = configureStore(history)

export default function App() {
    React.useEffect(() => {
        document.title = "react-app-typescript"
    }, [])

    const [ready, setReady] = React.useState(false)
    React.useEffect(() => {
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
