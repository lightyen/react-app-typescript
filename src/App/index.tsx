import React from "react"
import { createBrowserHistory } from "history"
import { ConnectedRouter } from "connected-react-router"
import AppRouter from "./AppRouter"
import { Provider } from "react-redux"
import ErrorBoundary from "~/components/ErrorBoundary"

// styles
import "bootstrap"
import "./icons"
import "./scss/style.scss"

// store
import { configureStore } from "~/store"

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL + "/" })
export const store = configureStore(history)

const App: React.FC = () => {
    React.useEffect(() => {
        document.title = process.env.APP_NAME
    }, [])

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <AppRouter />
            </ConnectedRouter>
        </Provider>
    )
}

export default () => (
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
)
