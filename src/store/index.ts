import { combineReducers, applyMiddleware, createStore, Middleware, AnyAction } from "redux"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { History } from "history"

import { isDevelopment } from "~/utils"
import { IUserStore, userReducer } from "./user/reducer"
import { IntlStore, intlReducer } from "./i18n/reducer"
import { RouterState, routerMiddleware, connectRouter } from "connected-react-router"

export interface IAppStore {
    router: RouterState
    user: IUserStore
    intl: IntlStore
}

const myMiddleware: Middleware<{}, IAppStore> = ({ dispatch, getState }) => next => action => {
    console.log(getState())
    next(action)
    console.log(getState())
}

const createAppReducer = (history: History) =>
    combineReducers<IAppStore>({
        user: userReducer,
        intl: intlReducer,
        router: connectRouter(history),
    })

export function configureStore(history: History) {
    const rootReducer = createAppReducer(history)
    const middlewares: Middleware[] = [routerMiddleware(history), thunkMiddleware]
    const storeEnhancers = applyMiddleware(...middlewares)
    const composeEnhancers = composeWithDevTools({
        // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    })
    return createStore(rootReducer, undefined, isDevelopment() ? composeEnhancers(storeEnhancers) : storeEnhancers)
}
