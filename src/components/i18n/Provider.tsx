import { Provider as ReduxProvider } from "react-redux"
import React from "react"

import { AppStore } from "~/store"
import IntlProvider from "./IntlProvider"
import { Store, AnyAction } from "redux"

interface IProps {
    store: Store<AppStore, AnyAction>
}

/** 提供 i18n 功能的 Redux Provider */
const Provider: React.FC<IProps> = ({ store, children }) => (
    <ReduxProvider store={store}>
        <IntlProvider>{children}</IntlProvider>
    </ReduxProvider>
)

export default Provider
