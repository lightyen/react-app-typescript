import React, { useState, useEffect } from "react"
import { createBrowserHistory } from "history"
import { ConnectedRouter } from "connected-react-router"
import AppRouter from "./AppRouter"
import ErrorBoundary from "~/components/ErrorBoundary"

// prismjs
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "prismjs/plugins/toolbar/prism-toolbar.css"

// styles
import "bootstrap"
import "./icons"
import "./scss/style.scss"

// store
import { configureStore } from "~/store"
import { Provider } from "~/components/i18n"

// locale
import { SET_LOCALE, setLocale } from "~/store/i18n"

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL + "/" })
export const store = configureStore(history)

const App: React.FC = () => {
    const [ready, setReady] = useState(false)
    useEffect(() => {
        document.title = process.env.APP_NAME
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

export default () => (
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
)
