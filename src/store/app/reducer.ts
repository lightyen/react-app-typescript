import { Reducer } from "redux"
import Action from "./action"
import { BreakPoint } from "./type"

export interface AppStore {
    breakpoint: BreakPoint
    collapsed: boolean
    sashLeft: number
}

function getBreakPoint(): BreakPoint {
    if (window.matchMedia("(min-width: 576px)").matches) {
        return "sm"
    } else if (window.matchMedia("(min-width: 768px)").matches) {
        return "md"
    } else if (window.matchMedia("(min-width: 992px)").matches) {
        return "lg"
    } else if (window.matchMedia("(min-width: 1200px)").matches) {
        return "xl"
    }
    return "xs"
}

const init: AppStore = {
    breakpoint: getBreakPoint(),
    collapsed: !window.matchMedia("(min-width: 992px)").matches,
    sashLeft: 230,
}

export const appReducer: Reducer<AppStore, Action> = (state = init, action): AppStore => {
    switch (action.type) {
        case "APP_SET_SASH_LEFT":
            if (action.left >= 230 && action.left < 600) {
                return { ...state, sashLeft: action.left }
            }
            return state
        case "APP_SET_BREAKPOINT":
            const collapsed =
                action.breakpoint === "xs" || action.breakpoint === "sm" || action.breakpoint === "md" ? true : false
            return { ...state, breakpoint: action.breakpoint, collapsed }
        case "APP_SET_COLLAPSED":
            return { ...state, collapsed: action.collapsed }
        default:
            return state
    }
}
