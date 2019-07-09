import { User } from "./model/User"

export enum LOGIN {
    REQUEST = "LOGIN_REQUEST",
    SUCCESS = "LOGIN_SUCCESS",
    FAILURE = "LOGIN_FAILURE",
}

export enum LOGOUT {
    REQUEST = "LOGOUT_REQUEST",
    SUCCESS = "LOGOUT_SUCCESS",
    FAILURE = "LOGOUT_FAILURE",
}

export const AUTH_FAILED = "AUTH_FAILED"

export interface LoginAction {
    type: LOGIN.REQUEST
    user: User
}

export interface LogoutAction {
    type: LOGOUT.REQUEST
}

export const login = (user: User): LoginAction => {
    return { type: LOGIN.REQUEST, user }
}

export const logout = () => {
    return { type: LOGOUT.REQUEST }
}

export type SagaLoginAction =
    | {
          type: LOGIN.SUCCESS
      }
    | {
          type: LOGIN.FAILURE
          error: unknown
      }

export type SagaLogoutAction =
    | {
          type: LOGOUT.SUCCESS
      }
    | {
          type: LOGOUT.FAILURE
          error: unknown
      }

interface AuthFailedAction {
    type: typeof AUTH_FAILED
}

type Action = LoginAction | SagaLoginAction | LogoutAction | SagaLogoutAction | AuthFailedAction
export default Action
