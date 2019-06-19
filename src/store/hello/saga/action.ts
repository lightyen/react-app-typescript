import * as types from "../actionTypes"

/** Hello World */
export const getHello = () => {
    return { type: types.GET_HELLO.REQUEST }
}
