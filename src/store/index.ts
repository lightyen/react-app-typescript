import { combineReducers, applyMiddleware, createStore, Middleware, AnyAction } from "redux"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { History, Action } from "history"

import { isDevelopment } from "~/utils"
import { IUserStore, userReducer } from "./user/reducer"
import { IntlStore, intlReducer } from "./i18n/reducer"
import { IRouterStore, createRouterReducer } from "./router/reducer"
import { CALL_HISTORY_METHOD } from "./router/action"

export interface IAppStore {
    user: IUserStore
    intl: IntlStore
    router: IRouterStore
}

const routerMiddleware: (history: History) => Middleware<IAppStore, AnyAction> = history => store => next => action => {
    if (action.type !== CALL_HISTORY_METHOD) {
        return next(action)
    }
    const {
        payload: { method, args },
    } = action

    history[method](...args)
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
        router: createRouterReducer(history),
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
