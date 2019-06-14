import { Reducer } from "redux"

import { LOGIN, LOGOUT, AUTH_FAILED } from "~/store/auth"
import { ReduxAction } from "~/store/auth/saga/reduxAction"
import { isLogin } from "~/utils/auth"

type UserActionType = ReduxAction | { type: typeof AUTH_FAILED }

interface UserStoreType {
    logined: boolean
    /** 請求狀態 */
    status?: string
    /** 錯誤訊息 */
    error?: unknown
}

export type UserStore = Readonly<UserStoreType>

const init: UserStore = {
    logined: isLogin(),
    status: "",
    error: null,
}

export const userReducer: Reducer<UserStore, UserActionType> = (state = init, action): UserStore => {
    switch (action.type) {
        case LOGIN.REQUEST:
            return { ...state, status: LOGIN.REQUEST }
        case LOGIN.SUCCESS:
            return { ...state, status: LOGIN.SUCCESS, logined: true }
        case LOGIN.FAILURE:
            return { ...state, status: LOGIN.FAILURE, error: action.error }

        case LOGOUT.REQUEST:
            return { ...state, status: LOGOUT.REQUEST }
        case LOGOUT.SUCCESS:
            return { ...state, ...init, status: LOGOUT.SUCCESS, logined: false }
        case LOGOUT.FAILURE:
            return { ...state, status: LOGOUT.FAILURE, error: action.error }

        case AUTH_FAILED:
            return { ...state, logined: false }

        // default
        default:
            return state
    }
}
