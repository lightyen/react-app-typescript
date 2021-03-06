export const SET_WINSIZE = "APP_SET_WINSIZE"
export const SET_COLLAPSED = "APP_SET_COLLAPSED"
export const SET_SASH_LEFT = "APP_SET_SASH_LEFT"
export const SET_BREAKPOINT = "APP_SET_BREAKPOINT"

export type BreakPoint = "xs" | "sm" | "md" | "lg" | "xl"

export interface WinSize {
    width: number
    heidht: number
}

export interface SetWinSizeAction {
    type: typeof SET_WINSIZE
    size: WinSize
}

export interface SetCollapsedAction {
    type: typeof SET_COLLAPSED
    collapsed: boolean
}

export interface SetSashLeftAction {
    type: typeof SET_SASH_LEFT
    left: number
}

export const setCollapsed = (collapsed: boolean): SetCollapsedAction => {
    return { type: SET_COLLAPSED, collapsed }
}

export const setSashLeft = (left: number): SetSashLeftAction => {
    return { type: SET_SASH_LEFT, left }
}

const actionCreators = {
    setCollapsed,
    setSashLeft,
}

export default actionCreators

export interface SetBreakpointAction {
    type: typeof SET_BREAKPOINT
    breakpoint: BreakPoint
}

export type Action = SetWinSizeAction | SetCollapsedAction | SetSashLeftAction | SetBreakpointAction
