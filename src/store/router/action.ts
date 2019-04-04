import { Location, Action, Path, LocationDescriptorObject } from "history"

export const LOCATION_CHANGE = "@@router/LOCATION_CHANGE"
export const CALL_HISTORY_METHOD = "@@router/CALL_HISTORY_METHOD"

export interface IRouterOnLocationChangedAction {
    type: typeof LOCATION_CHANGE
    location: Location
    action: Action
    isFirstRendering: boolean
}

export interface IRouterUpdateLocationAction {
    type: typeof CALL_HISTORY_METHOD
    method: string
    args: any[]
}

export type IRouterAction = IRouterOnLocationChangedAction | IRouterUpdateLocationAction

export const onLocationChanged = (
    location: Location,
    action: Action,
    isFirstRendering = false,
): IRouterOnLocationChangedAction => ({
    type: LOCATION_CHANGE,
    location,
    action,
    isFirstRendering,
})
export type IAction = typeof onLocationChanged | CallHistoryMethod

// 以下可以藉由控制 redux 狀態來修改 history，不過我覺得直接使用 react-router 的 history 更直覺些...

type CallHistoryMethod = (...args: any[]) => IRouterUpdateLocationAction

type UpdateLocation = (method: string) => CallHistoryMethod

const updateLocation: UpdateLocation = method => (...args) => ({
    type: CALL_HISTORY_METHOD,
    method,
    args,
})

/**
 * push(path: Path, state?: HistoryLocationState): void;
 *
 * push(location: LocationDescriptorObject<HistoryLocationState>): void;
 */
export const push = (...args: any[]): IRouterUpdateLocationAction => ({
    type: CALL_HISTORY_METHOD,
    method: "push",
    args,
})

/**
 * replace(path: Path, state?: HistoryLocationState): void;
 *
 * replace(location: LocationDescriptorObject<HistoryLocationState>): void;
 */
export const replace = (...args: any[]): IRouterUpdateLocationAction => ({
    type: CALL_HISTORY_METHOD,
    method: "replace",
    args,
})

export const go = (delta?: number): IRouterUpdateLocationAction => ({
    type: CALL_HISTORY_METHOD,
    method: "go",
    args: [delta],
})

export const goBack = (): IRouterUpdateLocationAction => ({
    type: CALL_HISTORY_METHOD,
    method: "goBack",
    args: [],
})

export const goForward = (): IRouterUpdateLocationAction => ({
    type: CALL_HISTORY_METHOD,
    method: "goForward",
    args: [],
})
