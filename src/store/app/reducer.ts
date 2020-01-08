import { Reducer } from "redux"
import { Action } from "./action"
import { BreakPoint, WinSize } from "./type"

export interface AppStore {
    breakpoint: BreakPoint
    collapsed: boolean
    navCollapsed: boolean
    sashLeft: number
    win: WinSize
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

const defaultSashLeft = 230

const init: AppStore = {
    breakpoint: getBreakPoint(),
    collapsed: window.matchMedia("(max-width: 992px)").matches,
    navCollapsed: false,
    sashLeft: defaultSashLeft,
    win: { width: document.body.clientWidth, heidht: document.body.clientHeight },
}

export const appReducer: Reducer<AppStore, Action> = (state = init, action): AppStore => {
    switch (action.type) {
        case "APP_SET_WINSIZE":
            const maxw = action.size.width / 2
            const left = maxw < state.sashLeft ? (maxw < defaultSashLeft ? defaultSashLeft : maxw) : state.sashLeft
            return { ...state, win: action.size, sashLeft: left }
        case "APP_SET_SASH_LEFT":
            if (action.left >= defaultSashLeft && action.left < state.win.width / 2) {
                return { ...state, sashLeft: action.left }
            }
            return state
        case "APP_SET_BREAKPOINT":
            const collapsed =
                action.breakpoint === "xs" || action.breakpoint === "sm" || action.breakpoint === "md" ? true : false
            return { ...state, breakpoint: action.breakpoint, collapsed: state.navCollapsed ? true : collapsed }
        case "APP_SET_COLLAPSED":
            const navCollapsed = action.collapsed
            return { ...state, navCollapsed, collapsed: navCollapsed }
        default:
            return state
    }
}
