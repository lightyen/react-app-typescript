import { Reducer } from "redux"
import { GET_HELLO } from "./actionTypes"
import { ReduxAction } from "./saga/reduxAction"

export interface HelloStore {
    status: string
}

const init: HelloStore = {
    status: "",
}

export const helloReducer: Reducer<HelloStore, ReduxAction> = (state = init, action): HelloStore => {
    switch (action.type) {
        case GET_HELLO.REQUEST:
            return { ...state, status: GET_HELLO.REQUEST }
        case GET_HELLO.SUCCESS:
            return { ...state, status: GET_HELLO.SUCCESS }
        case GET_HELLO.FAILURE:
            return { ...state, status: GET_HELLO.FAILURE }
        default:
            return state
    }
}