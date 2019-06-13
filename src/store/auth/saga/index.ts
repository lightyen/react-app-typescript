import { take, put, call, all, fork, takeLeading } from "redux-saga/effects"
import { SagaIterator } from "redux-saga"
import axios, { AxiosResponse } from "axios"

import { LOGIN, LOGOUT } from "../actionTypes"
import * as actions from "./action"
import { LoginAction, LogoutAction } from "./reduxAction"

import { setAuthToken, clearAuthToken } from "~/utils/auth"

interface Response {
    success: boolean
    message: string
}

export function* login(action: ReturnType<typeof actions.login>): SagaIterator {
    try {
        const { user } = action
        const result: AxiosResponse<Response> = yield call(o => axios.post("/apis/login", o), user)
        setAuthToken('{ "message": "helloworld" }')
        yield put<LoginAction>({ type: LOGIN.SUCCESS })
    } catch (err) {
        yield put<LoginAction>({ type: LOGIN.FAILURE, error: err })
    }
}

export function* logout(action: ReturnType<typeof actions.logout>): SagaIterator {
    try {
        const result: AxiosResponse<Response> = yield call(() => axios.get("/apis/logout"))
        clearAuthToken()
        yield put<LogoutAction>({ type: LOGOUT.SUCCESS })
    } catch (err) {
        yield put<LogoutAction>({ type: LOGOUT.FAILURE, error: err })
    }
}

function* watcherLogin() {
    yield takeLeading(LOGIN.REQUEST, login)
}

function* watcherLogout() {
    yield takeLeading(LOGOUT.REQUEST, logout)
}

export default function* watcher() {
    yield all([fork(watcherLogin), fork(watcherLogout)])
}
