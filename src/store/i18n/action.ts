import { ThunkAction } from "redux-thunk"
import moment from "moment"
import axios from "axios"

import { AppLocale } from "~/locale"
import { IntlStore } from "./reducer"
import { Locale } from "~/locale/languages"
import { getLocaleByName } from "~/locale/utils"

export enum SET_LOCALE {
    REQUEST = "SET_LOCALE_REQUEST",
    SUCCESS = "SET_LOCALE_SUCCESS",
    FAILURE = "SET_LOCALE_FAILURE",
}

interface IntlSetLocaleAction {
    type: SET_LOCALE.SUCCESS
    locale: Locale
}

export type IntlAction = IntlSetLocaleAction

export type IntlThunkAction = ThunkAction<Promise<void>, IntlStore, null, IntlAction>

export const setLocale = (localeName: AppLocale): IntlThunkAction => async dispatch => {
    const m = await getLocaleByName(localeName)
    moment.locale(localeName)
    if (m.__esModule) {
        dispatch({ type: SET_LOCALE.SUCCESS, locale: m.default })
    } else {
        dispatch({ type: SET_LOCALE.SUCCESS, locale: m as any })
    }
}
