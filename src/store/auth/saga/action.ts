import * as types from "../actionTypes"
import { User } from "~/store/model"

export const login = (user: User) => {
    return { type: types.LOGIN.REQUEST, user }
}

export const logout = () => {
    return { type: types.LOGOUT.REQUEST }
}
