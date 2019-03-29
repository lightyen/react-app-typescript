import { ThunkAction } from "redux-thunk"
import moment from "moment"
import axios from "axios"

import { AppLocale } from "~/locale"
import { IntlStore } from "./reducer"

export enum SET_LOCALE {
    REQUEST = "SET_LOCALE_REQUEST",
    SUCCESS = "SET_LOCALE_SUCCESS",
    FAILURE = "SET_LOCALE_FAILURE",
}

interface IntlSetLocaleAction {
    type: SET_LOCALE.SUCCESS
    localeName: AppLocale
}

export type IntlAction = IntlSetLocaleAction

export type IntlThunkAction = ThunkAction<Promise<void>, IntlStore, null, IntlAction>

export const setLocale = (localeName: AppLocale): IntlThunkAction => async dispatch => {
    moment.locale(localeName)
    dispatch({ type: SET_LOCALE.SUCCESS, localeName })
}
