import { combineReducers, applyMiddleware, createStore, Middleware, AnyAction } from "redux"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { History } from "history"
import createSagaMiddleware from "redux-saga"

import { RouterState, routerMiddleware, connectRouter } from "connected-react-router"
import { isDevelopment } from "~/utils"
import { IUserStore, userReducer } from "./user/reducer"
import { IntlStore, intlReducer } from "./i18n/reducer"
import { HelloStore, helloReducer } from "./saga/hello/reducer"
import rootSaga from "~/store/saga"

export interface IAppStore {
    router: RouterState
    user: IUserStore
    intl: IntlStore
    hello: HelloStore
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
        hello: helloReducer,
    })

export function configureStore(history: History) {
    const rootReducer = createAppReducer(history)
    const sagaMiddleware = createSagaMiddleware()
    const middlewares: Middleware[] = [routerMiddleware(history), sagaMiddleware]
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
