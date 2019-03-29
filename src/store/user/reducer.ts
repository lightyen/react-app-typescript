import { Reducer } from "redux"

import { IUserAction, GET_USER, SET_USER } from "./action"
import { IUser } from "./model"

type UserActionType = GET_USER | typeof SET_USER

interface UserStoreType {
    /** 當前使用者資訊 */
    currentUser: IUser
    /** 請求狀態 */
    status?: UserActionType
    /** 錯誤訊息 */
    error?: any
}

export type IUserStore = Readonly<UserStoreType>

const init: IUserStore = {
    currentUser: { name: "", age: 0 },
}

export const userReducer: Reducer<IUserStore, IUserAction> = (state = init, action): IUserStore => {
    switch (action.type) {
        // case LOGOUT:
        // return {...state, init }

        // get user
        case GET_USER.REQUEST:
            return { ...state, status: GET_USER.REQUEST, error: null }
        case GET_USER.SUCCESS:
            return { ...state, status: GET_USER.SUCCESS, error: null, currentUser: action.user }
        case GET_USER.FAILURE:
            return { ...state, status: GET_USER.FAILURE, error: action.error }

        // set user
        case SET_USER:
            return { ...state, status: SET_USER, error: null, currentUser: action.user }

        // default
        default:
            return state
    }
}
