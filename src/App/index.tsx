import React from "react"
import AppRouter from "./AppRouter"

// Mobx
// import { Provider as MobxProvider } from "mobx-react"
// import { createStore } from "~/store/mobx"

// Redux
import { configureStore } from "~/store/redux"
// import { Provider } from "react-redux"
import { Provider } from "~/components/i18n"

import "./bootstrap"

export default function App() {
    const reduxStore = configureStore()
    // const mobxStore = createStore()

    React.useEffect(() => {
        document.title = "react-app-typescript"
        // from Webpack EnvironmentPlugin
        // console.log(process.env.NODE_ENV)
    })

    return (
        <Provider store={reduxStore}>
            <AppRouter />
        </Provider>
        // <MobxProvider {...mobxStore}>
        //     <AppRouter />
        // </MobxProvider>
    )
}
