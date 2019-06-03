import { take, put, call, fork, all, takeEvery, takeLatest, AllEffect } from "redux-saga/effects"
import { SagaIterator } from "redux-saga"
import moment from "moment"

import { SET_LOCALE } from "../actionTypes"
import * as actions from "./action"
import { SetLocaleAction } from "./reduxAction"

import { AppLocale, CustomLocale } from "~/typings/i18n"
import { getLocaleByName, appLocaleList } from "~/utils/i18n"

function* setLocale(action: ReturnType<typeof actions.setLocale>): SagaIterator {
    try {
        const found = appLocaleList.hasOwnProperty(action.localeName)
        const name: AppLocale = found ? (action.localeName as AppLocale) : "en-US"
        yield put<SetLocaleAction>({ type: SET_LOCALE.REQUEST })
        const modu = yield call(getLocaleByName, name)
        if (modu) {
            moment.locale(name)
            if (modu.__esModule) {
                yield put<SetLocaleAction>({ type: SET_LOCALE.SUCCESS, locale: modu.default })
            } else {
                yield put<SetLocaleAction>({ type: SET_LOCALE.SUCCESS, locale: modu as CustomLocale })
            }
        }
    } catch (error) {
        yield put<SetLocaleAction>({ type: SET_LOCALE.FAILURE, error })
    }
}

export default function* watcher() {
    while (true) {
        const action = yield take(SET_LOCALE.REQUEST)
        yield call(setLocale, action)
    }
}
