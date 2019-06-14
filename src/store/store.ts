import { createStore, applyMiddleware, combineReducers, Middleware, AnyAction } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { History } from "history"
import createSagaMiddleware from "redux-saga"

import { RouterState, routerMiddleware, connectRouter } from "connected-react-router"
import { isDevelopment } from "~/utils"
import { UserStore, userReducer } from "./user"
import { IntlStore, intlReducer } from "./i18n"
import { HelloStore, helloReducer } from "./hello"
import rootSaga from "~/store/saga"

export interface IAppStore {
    router: RouterState
    intl: IntlStore
    user: UserStore
    hello: HelloStore
}

const myMiddleware: Middleware<{}, IAppStore> = store => next => (action: AnyAction) => {
    const { type } = action
    if (typeof type === "string") {
        if (type.startsWith("@@router")) {
        }
    }

    if (!action["@@redux-saga/SAGA_ACTION"]) {
        // console.log("action", action)
    }
    next(action)
}

const createAppReducer = (history: History) =>
    combineReducers<IAppStore>({
        user: userReducer,
        intl: intlReducer,
        router: connectRouter(history),
        hello: helloReducer,
    })

export function configureStore(history: History) {
    const rootReducer = createAppReducer(history)
    const sagaMiddleware = createSagaMiddleware()
    const middlewares: Middleware[] = [routerMiddleware(history), myMiddleware, sagaMiddleware]
    const storeEnhancers = applyMiddleware(...middlewares)
    const composeEnhancers = composeWithDevTools({
        // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    })
    const store = createStore(
        rootReducer,
        undefined,
        isDevelopment() ? composeEnhancers(storeEnhancers) : storeEnhancers,
    )
    sagaMiddleware.run(rootSaga)
    return store
}
