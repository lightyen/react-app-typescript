import { Location, Action } from "history"
import {} from "react-router-dom"

export const LOCATION_CHANGE = "@@router/LOCATION_CHANGE"
export const CALL_HISTORY_METHOD = "@@router/CALL_HISTORY_METHOD"
type Method = "push" | "replace" | "go" | "goBack" | "goForward"

export interface IRouterOnLocationChangedAction {
    type: typeof LOCATION_CHANGE
    location: Location
    action: Action
    isFirstRendering: boolean
}

export interface IRouterUpdateLocationAction {
    type: typeof CALL_HISTORY_METHOD
    location: Location
    method: Method
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

type CallHistoryMethod = (
    ...args: any[]
) => {
    type: string
    method: Method
    args: any[]
}

type UpdateLocation = (method: Method) => CallHistoryMethod

const updateLocation: UpdateLocation = method => (...args) => ({
    type: CALL_HISTORY_METHOD,
    method,
    args,
})

export const push = updateLocation("push")
export const replace = updateLocation("replace")
export const go = updateLocation("go")
export const goBack = updateLocation("goBack")
export const goForward = updateLocation("goForward")

export type IAction = typeof onLocationChanged | CallHistoryMethod
