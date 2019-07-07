const SET_COLLAPSED = "APP_SET_COLLAPSED"

export interface SetCollapsedAction {
    type: typeof SET_COLLAPSED
    collapsed: boolean
}

export const setCollapsed = (collapsed: boolean): SetCollapsedAction => {
    return { type: SET_COLLAPSED, collapsed }
}

type Action = SetCollapsedAction
export default Action
