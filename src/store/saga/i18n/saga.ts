import { take, put, call, fork, all, takeEvery, takeLatest, AllEffect } from "redux-saga/effects"
import { SagaIterator } from "redux-saga"
import { SagaAction, SET_LOCALE } from "./action"
import moment from "moment"
import { AppLocale, CustomLocale } from "~/typings/i18n"
import { getLocaleByName, appLocaleList } from "~/utils/i18n"

type IntlSetLocaleAction = { type: SET_LOCALE.FAILURE; error: any } | { type: SET_LOCALE.SUCCESS; locale: CustomLocale }

export function* setLocale(localeName: string): SagaIterator {
    try {
        const found = appLocaleList.hasOwnProperty(localeName)
        const name: AppLocale = found ? (localeName as AppLocale) : "en-US"
        console.log("call getLocaleByName")
        const modu = yield call(getLocaleByName, name)
        console.log("get getLocaleByName")
        if (modu) {
            moment.locale(name)
            if (modu.__esModule) {
                yield put<IntlSetLocaleAction>({ type: SET_LOCALE.SUCCESS, locale: modu.default })
            } else {
                yield put<IntlSetLocaleAction>({ type: SET_LOCALE.SUCCESS, locale: modu as CustomLocale })
            }
        }
    } catch (error) {
        yield put<IntlSetLocaleAction>({ type: SET_LOCALE.FAILURE, error })
    }
}

function* watcher() {
    while (true) {
        const action: SagaAction = yield take(SET_LOCALE.REQUEST)
        yield call(setLocale, action.localeName)
    }
}

export default watcher()
