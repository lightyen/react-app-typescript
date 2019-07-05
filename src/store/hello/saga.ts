import { take, put, call, fork, all, takeEvery } from "redux-saga/effects"
import axios, { AxiosResponse } from "axios"

import * as action from "./action"

function* getHello(act: action.GetHelloAction) {
    try {
        const options = {}
        const result: AxiosResponse<unknown> = yield call(o => axios.get("/apis/hello", o), options)
        yield put<action.SagaGetHelloAction>({ type: action.GET_HELLO.SUCCESS })
    } catch (err) {
        yield put<action.SagaGetHelloAction>({ type: action.GET_HELLO.FAILURE, error: err })
    }
}

function* watchHello() {
    yield takeEvery(action.GET_HELLO.REQUEST, getHello)
}

export default function* watcher() {
    yield all([call(watchHello)])
}
