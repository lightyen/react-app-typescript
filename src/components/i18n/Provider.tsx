import { Provider as ReduxProvider } from "react-redux"
import React from "react"

import { IAppStore } from "~/store/redux"
import IntlProvider from "./IntlProvider"
import { Store, AnyAction } from "redux"

interface IProps {
    store: Store<IAppStore, AnyAction>
}

const Provider: React.FC<IProps> = ({ store, children }) => (
    <ReduxProvider store={store}>
        <IntlProvider>{children}</IntlProvider>
    </ReduxProvider>
)

export default Provider
