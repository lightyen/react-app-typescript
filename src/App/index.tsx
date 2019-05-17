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
    const [store, setStore] = React.useState(null)
    React.useEffect(() => {
        document.title = "react-app-typescript"
    })

    const history = createHashHistory()

    React.useEffect(() => {
        const store = configureStore(history)
        const locale = "en-US" || navigator.languages[0]
        setLocale(locale)(store.dispatch, null, null).then(() => {
            setStore(store)
        })
    }, [])

    return store ? (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <AppRouter />
            </ConnectedRouter>
        </Provider>
    ) : null
}
