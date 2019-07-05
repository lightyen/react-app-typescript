import { Reducer } from "redux"

import { LOGIN, LOGOUT, AUTH_FAILED } from "~/store/auth"
import Action from "~/store/auth/action"
import { isLogin } from "~/utils/auth"

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
    error: undefined,
}

export const userReducer: Reducer<UserStore, Action> = (state = init, action): UserStore => {
    switch (action.type) {
        case LOGIN.REQUEST:
            return { ...state, status: LOGIN.REQUEST }
        case LOGIN.SUCCESS:
            return { ...state, status: LOGIN.SUCCESS, logined: true, error: null }
        case LOGIN.FAILURE:
            return { ...state, status: LOGIN.FAILURE, error: action.error }

        case LOGOUT.REQUEST:
            return { ...state, status: LOGOUT.REQUEST }
        case LOGOUT.SUCCESS:
            return { ...state, ...init, status: LOGOUT.SUCCESS }
        case LOGOUT.FAILURE:
            return { ...state, status: LOGOUT.FAILURE, error: action.error }

        case AUTH_FAILED:
            return { ...state, logined: false }

        // default
        default:
            return state
    }
}
