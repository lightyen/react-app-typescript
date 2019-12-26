import { createStore, applyMiddleware, combineReducers, Middleware, AnyAction } from "redux"
import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { History } from "history"
import createSagaMiddleware from "redux-saga"

import { RouterState, routerMiddleware, connectRouter } from "connected-react-router"
import { AppStore, appReducer } from "./app"
import { UserStore, userReducer } from "./user"
import { HelloStore, helloReducer } from "./hello"
import rootSaga from "~/store/saga"

export interface RootStore {
    app: AppStore
    router: RouterState
    user: UserStore
    hello: HelloStore
}

const myMiddleware: Middleware<{}, RootStore> = store => next => (action: AnyAction) => {
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

const createRootReducer = (history: History) =>
    combineReducers({
        user: userReducer,
        app: appReducer,
        router: connectRouter(history),
        hello: helloReducer,
    })

export function configureStore(history: History) {
    const rootReducer = createRootReducer(history)
    const sagaMiddleware = createSagaMiddleware()
    const middlewares: Middleware[] = [routerMiddleware(history), myMiddleware, sagaMiddleware]
    const storeEnhancers = applyMiddleware(...middlewares)
    const composeEnhancers = composeWithDevTools({
        // Specify name here, actionsBlacklist, actionsCreators and other options if needed
        name: "react is awesome",
    })
    const store = createStore(
        rootReducer,
        undefined,
        process.env.NODE_ENV === "development" ? composeEnhancers(storeEnhancers) : storeEnhancers,
    )
    sagaMiddleware.run(rootSaga)
    return store
}

export const useSelector: TypedUseSelectorHook<RootStore> = useReduxSelector
