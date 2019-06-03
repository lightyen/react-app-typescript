import { take, put, call, fork, all, takeEvery, takeLatest, AllEffect } from "redux-saga/effects"
import { SagaIterator } from "redux-saga"
import { SagaAction, SET_LOCALE } from "./action"
import moment from "moment"
import { AppLocale, CustomLocale } from "~/typings/i18n"
import { getLocaleByName, appLocaleList } from "~/utils/i18n"

type IntlSetLocaleAction = { type: SET_LOCALE.FAILURE; error: any } | { type: SET_LOCALE.SUCCESS; locale: CustomLocale }

export function* setLocale(action: SagaAction): SagaIterator {
    try {
        const found = appLocaleList.hasOwnProperty(action.localeName)
        const name: AppLocale = found ? (action.localeName as AppLocale) : "en-US"
        const modu = yield call(getLocaleByName, name)
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
        const action = yield take(SET_LOCALE.REQUEST)
        yield call(setLocale, action)
    }
}

export default watcher()
