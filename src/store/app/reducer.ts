import { Reducer } from "redux"
import Action from "./action"

export interface AppStore {
    collapsed: boolean
}

const init: AppStore = {
    collapsed: !window.matchMedia("(min-width: 992px)").matches,
}

export const appReducer: Reducer<AppStore, Action> = (state = init, action): AppStore => {
    switch (action.type) {
        case "APP_SET_COLLAPSED":
            return { ...state, collapsed: action.collapsed }
        default:
            return state
    }
}
