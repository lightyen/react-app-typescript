import React from "react"
import { createHashHistory } from "history"
import AppRouter from "./AppRouter"

// Redux
import { configureStore } from "~/store"
import { Provider } from "~/components/i18n"

import "bootstrap"
import "bootstrap/scss/bootstrap.scss"
import "./scss/App.scss"
import { setLocale } from "~/store/i18n"
import ConnectedRouter from "~/components/router/ConnectedRouter"

export default () => {
    const [appStore, setAppStore] = React.useState(null)
    React.useEffect(() => {
        document.title = "react-app-typescript"
    })

    const history = createHashHistory()

    React.useEffect(() => {
        ;(async () => {
            const store = configureStore(history)
            const locale = navigator.languages[0]
            await setLocale(locale)(store.dispatch, null, null)
            setAppStore(store)
        })()
    }, [])

    return appStore ? (
        <Provider store={appStore}>
            <ConnectedRouter history={history}>
                <AppRouter />
            </ConnectedRouter>
        </Provider>
    ) : null
}
