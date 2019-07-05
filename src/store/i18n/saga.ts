import { take, put, call, fork, all, takeEvery, takeLatest, AllEffect } from "redux-saga/effects"
import { SagaIterator } from "redux-saga"
import moment from "moment"

import * as action from "./action"

import { AppLocale, CustomLocale } from "~/typings/i18n"
import { getLocaleByName, appLocaleList } from "~/utils/i18n"

function* setLocale(act: action.SetLocaleAction): SagaIterator {
    try {
        const found = appLocaleList.hasOwnProperty(act.localeName)
        const name: AppLocale = found ? (act.localeName as AppLocale) : "en-US"
        const modu = yield call(getLocaleByName, name)
        if (modu) {
            moment.locale(name)
            if (modu.__esModule) {
                yield put<action.SagaSetLocaleAction>({ type: action.SET_LOCALE.SUCCESS, locale: modu.default })
            } else {
                yield put<action.SagaSetLocaleAction>({ type: action.SET_LOCALE.SUCCESS, locale: modu as CustomLocale })
            }
        }
    } catch (error) {
        yield put<action.SagaSetLocaleAction>({ type: action.SET_LOCALE.FAILURE, error })
    }
}

export default function* watcher() {
    while (true) {
        const act: action.SetLocaleAction = yield take(action.SET_LOCALE.REQUEST)
        yield call(setLocale, act)
    }
}
