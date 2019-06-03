import { take, put, call, fork, all, takeEvery, takeLatest, AllEffect } from "redux-saga/effects"
import { SagaIterator } from "redux-saga"
import axios, { AxiosResponse } from "axios"

import { GET_HELLO } from "../actionTypes"
import * as actions from "./action"
import { GetHelloAction } from "./reduxAction"

function* getHello(action: ReturnType<typeof actions.getHello>): SagaIterator {
    try {
        const options = {}
        const result: AxiosResponse = yield call(o => axios.get("/apis/hello", o), options)
        yield put<GetHelloAction>({ type: GET_HELLO.SUCCESS })
    } catch (err) {
        yield put<GetHelloAction>({ type: GET_HELLO.FAILURE, error: err })
    }
}

function* watcher() {
    while (true) {
        const action = yield take(GET_HELLO.REQUEST)
        yield call(getHello, action)
    }
}

export default watcher()
