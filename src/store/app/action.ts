import { BreakPoint } from "./type"

const SET_COLLAPSED = "APP_SET_COLLAPSED"
const SET_BREAKPOINT = "APP_SET_BREAKPOINT"

export interface SetCollapsedAction {
    type: typeof SET_COLLAPSED
    collapsed: boolean
}

export const setCollapsed = (collapsed: boolean): SetCollapsedAction => {
    return { type: SET_COLLAPSED, collapsed }
}

export interface SetBreakpointAction {
    type: typeof SET_BREAKPOINT
    breakpoint: BreakPoint
}

type Action = SetCollapsedAction | SetBreakpointAction
export default Action
