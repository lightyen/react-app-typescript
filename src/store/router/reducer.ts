import { Reducer } from "redux"
import { History, Location, Action } from "history"
import { IRouterAction, LOCATION_CHANGE, CALL_HISTORY_METHOD } from "./action"

interface RouterStoreType {
    location: Location
    action: Action
    isFirstRendering: boolean
}

export type IRouterStore = Readonly<RouterStoreType>

export function createRouterReducer(history: History) {
    const init: IRouterStore = {
        location: history.location,
        action: history.action,
        isFirstRendering: false,
    }

    const routerReducer: Reducer<IRouterStore, IRouterAction> = (state = init, action): IRouterStore => {
        switch (action.type) {
            case LOCATION_CHANGE:
                return {
                    ...state,
                    location: action.location,
                    action: action.action,
                    isFirstRendering: action.isFirstRendering,
                }
            case CALL_HISTORY_METHOD:
                return state
            default:
                return state
        }
    }

    return routerReducer
}
