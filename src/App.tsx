import React from "react"
import { createBrowserHistory } from "history"
import { ConnectedRouter } from "connected-react-router"
import AppContainer from "~/layout/AppContainer"
import { Provider } from "react-redux"
import ErrorBoundary from "~/components/ErrorBoundary"

// styles
import "bootstrap"
import "~/icons"
import "~/css/styles.css"
import "~/scss/styles.scss"

// store
import { configureStore } from "~/store"

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL + "/" })
export const store = configureStore(history)

const App: React.FC = () => {
    React.useEffect(() => {
        document.title = process.env.APP_NAME
    }, [])

    return (
        <ErrorBoundary>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <AppContainer />
                </ConnectedRouter>
            </Provider>
        </ErrorBoundary>
    )
}

export default App
