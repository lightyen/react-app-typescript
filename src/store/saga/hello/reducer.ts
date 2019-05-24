import { Reducer } from "redux"

export interface HelloStore {
    status: string
}

const init: HelloStore = {
    status: "",
}

export const helloReducer: Reducer<HelloStore, any> = (state = init, action): HelloStore => {
    switch (action.type) {
        case "GET_HELLO_REQUEST":
            return { ...state, status: "GET_HELLO_REQUEST" }
        case "GET_HELLO_SUCCESS":
            return { ...state, status: "GET_HELLO_SUCCESS" }
        case "GET_HELLO_FAILURE":
            return { ...state, status: "GET_HELLO_FAILURE" }
        default:
            return state
    }
}
