import { combineReducers, applyMiddleware, createStore, Middleware, AnyAction } from "redux"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import { isDevelopment } from "~/utils"
import { IUserStore, userReducer } from "./user/reducer"
import { IntlStore, intlReducer } from "./i18n/reducer"

export interface IAppStore {
    user: IUserStore
    intl: IntlStore
}

const myMiddleware: Middleware<{}, IAppStore> = ({ dispatch, getState }) => next => action => {
    console.log(getState())
    next(action)
    console.log(getState())
}

const createAppReducer = () =>
    combineReducers<IAppStore>({
        user: userReducer,
        intl: intlReducer,
    })

export function configureStore() {
    const rootReducer = createAppReducer()
    const middlewares: Middleware[] = [thunkMiddleware]

    const storeEnhancers = applyMiddleware(...middlewares)

    const composeEnhancers = composeWithDevTools({
        // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    })

    const store = createStore(
        rootReducer,
        undefined,
        isDevelopment() ? composeEnhancers(storeEnhancers) : storeEnhancers,
    )
    return store
}
