import * as types from "../actionTypes"

export const getHello = () => {
    return { type: types.GET_HELLO.REQUEST }
}
