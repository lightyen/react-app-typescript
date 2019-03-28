import React from "react"
import AppRouter from "./AppRouter"

// Mobx
// import { Provider as MobxProvider } from "mobx-react"
// import { createStore } from "~/store/mobx"

// Redux
import { Provider } from "react-redux"
import { configureStore } from "~/store/redux"

// i18n https://docs.microsoft.com/en-us/cpp/c-runtime-library/language-strings
import { IntlProvider, addLocaleData } from "react-intl"
import { getLocaleByName, AppLanguage, LanguageFields } from "~/locale/utils"

import "./bootstrap"

export default function App() {
    const reduxStore = configureStore()
    //const mobxStore = createStore()

    const lang: AppLanguage = "en-US"
    const locale = getLocaleByName(lang)
    console.log(locale.locale)
    addLocaleData(locale)

    React.useEffect(() => {
        document.title = "react-app-typescript"
        // from Webpack EnvironmentPlugin
        // console.log(process.env.NODE_ENV)
    })

    return (
        <Provider store={reduxStore}>
            <IntlProvider locale={lang} messages={locale.fields}>
                <AppRouter />
            </IntlProvider>
        </Provider>
        // <MobxProvider {...mobxStore}>
        //     <AppRouter />
        // </MobxProvider>
    )
}
