import { take, put, call, fork, all, takeEvery, takeLatest, AllEffect } from "redux-saga/effects"
import { SagaIterator } from "redux-saga"
import axios, { AxiosResponse } from "axios"

interface TAction {
    type: "GET_HELLO_REQUEST" | "GET_HELLO_SUCCESS" | "GET_HELLO_FAILURE"
}

export function* getHello(): SagaIterator {
    try {
        const options = {}
        const result: AxiosResponse = yield call(o => axios.get("/apis/hello", o), options)
        yield put<TAction>({ type: "GET_HELLO_SUCCESS" })
    } catch (err) {
        yield put<TAction>({ type: "GET_HELLO_FAILURE" })
    }
}

function* watcher() {
    yield all([takeLatest("GET_HELLO_REQUEST", getHello)])
}

export default watcher()
