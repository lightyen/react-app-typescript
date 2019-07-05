import { take, put, call, all, fork, takeLeading } from "redux-saga/effects"
import { SagaIterator } from "redux-saga"
import axios, { AxiosResponse } from "axios"

import * as action from "./action"

import { setAuthToken, clearAuthToken } from "~/utils/auth"

interface Response {
    success: boolean
    message: string
}

export function* login(act: action.LoginAction): SagaIterator {
    try {
        const { user } = act
        const result: AxiosResponse<Response> = yield call(o => axios.post("/apis/login", o), user)
        setAuthToken('{ "message": "helloworld" }')
        yield put<action.SagaLoginAction>({ type: action.LOGIN.SUCCESS })
    } catch (err) {
        yield put<action.SagaLoginAction>({ type: action.LOGIN.FAILURE, error: err })
    }
}

export function* logout(act: action.LogoutAction): SagaIterator {
    try {
        const result: AxiosResponse<Response> = yield call(() => axios.get("/apis/logout"))
        clearAuthToken()
        yield put<action.SagaLogoutAction>({ type: action.LOGOUT.SUCCESS })
    } catch (err) {
        yield put<action.SagaLogoutAction>({ type: action.LOGOUT.FAILURE, error: err })
    }
}

function* watcherLogin() {
    yield takeLeading(action.LOGIN.REQUEST, login)
}

function* watcherLogout() {
    yield takeLeading(action.LOGOUT.REQUEST, logout)
}

export default function* watcher() {
    yield all([fork(watcherLogin), fork(watcherLogout)])
}
