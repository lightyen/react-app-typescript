import { IAsyncAction } from "~/store/utils"
import { LOGIN, LOGOUT } from "../actionTypes"

export type LoginAction = IAsyncAction<LOGIN.REQUEST, LOGIN.FAILURE, LOGIN.SUCCESS>
export type LogoutAction = IAsyncAction<LOGOUT.REQUEST, LOGOUT.FAILURE, LOGOUT.SUCCESS>

export type ReduxAction = LoginAction | LogoutAction
