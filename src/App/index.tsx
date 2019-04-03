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
    const [store, setStore] = React.useState(null)
    React.useEffect(() => {
        document.title = "react-app-typescript"
    })

    React.useEffect(() => {
        ;(async () => {
            const appStore = configureStore()
            const locale = navigator.languages[0]
            await setLocale(locale)(appStore.dispatch, null, null)
            setStore(appStore)
        })()
    }, [])

    return store ? (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    ) : null
}
