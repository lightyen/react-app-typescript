import { take, put, call, fork, all, takeEvery, takeLatest, AllEffect } from "redux-saga/effects"
import { SagaIterator } from "redux-saga"
import axios, { AxiosResponse } from "axios"

interface TAction {
    type: "GET_HELLO" | "GET_HELLO_SUCCESS" | "GET_HELLO_FAILURE"
}

export function* getHello(): SagaIterator {
    try {
        const result: AxiosResponse = yield call(() => axios.get("/apis/hello"))
        console.log(result.data)
        yield put<TAction>({ type: "GET_HELLO_SUCCESS" })
    } catch (err) {
        yield put<TAction>({ type: "GET_HELLO_FAILURE" })
    }
}

export default function* watcher() {
    yield takeLatest("GET_HELLO", getHello)
}
