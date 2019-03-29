import { ThunkAction } from "redux-thunk"
import axios from "axios"

import { IAsyncAction } from "~/store/api"
import { IUserStore } from "./reducer"
import { IUser } from "./model"

export enum GET_USER {
    REQUEST = "GET_USER_REQUEST",
    SUCCESS = "GET_USER_SUCCESS",
    FAILURE = "GET_USER_FAILURE",
}

export const SET_USER = "SET_USER"

interface IUserSetUserAction {
    type: typeof SET_USER
    user: IUser
}

type IUserGetUserAction = IAsyncAction<
    GET_USER.REQUEST,
    GET_USER.FAILURE,
    GET_USER.SUCCESS,
    {
        user: IUser
    }
>

export type IUserAction = IUserSetUserAction | IUserGetUserAction

export type IUserThunkAction = ThunkAction<Promise<void>, IUserStore, null, IUserAction>

export const getUser = (): IUserThunkAction => async dispatch => {
    dispatch({ type: GET_USER.REQUEST })
    try {
        const response = await axios.get<IUser>("/apis/v1/hello")
        const user = response.data
        dispatch({ type: GET_USER.SUCCESS, user })
    } catch (error) {
        console.log(error)
        dispatch({ type: GET_USER.FAILURE, error })
    }
}

export const setUser = (user: IUser): IUserThunkAction => async dispatch => {
    dispatch({ type: SET_USER, user })
}
