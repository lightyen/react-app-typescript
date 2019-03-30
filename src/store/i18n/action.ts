import { ThunkAction } from "redux-thunk"
import moment from "moment"
import axios from "axios"

import { IAsyncAction } from "~/store/api"
import { AppLocale } from "~/locale"
import { IntlStore } from "./reducer"
import { Locale } from "~/locale/languages"
import { getLocaleByName } from "~/locale/utils"

export enum SET_LOCALE {
    REQUEST = "SET_LOCALE_REQUEST",
    SUCCESS = "SET_LOCALE_SUCCESS",
    FAILURE = "SET_LOCALE_FAILURE",
}

type IntlSetLocaleAction = IAsyncAction<
    SET_LOCALE.REQUEST,
    SET_LOCALE.FAILURE,
    SET_LOCALE.SUCCESS,
    {
        locale: Locale
    }
>

export type IntlAction = IntlSetLocaleAction

export type IntlThunkAction = ThunkAction<Promise<void>, IntlStore, null, IntlAction>

export const setLocale = (localeName: AppLocale): IntlThunkAction => async dispatch => {
    dispatch({ type: SET_LOCALE.REQUEST })
    try {
        const m = await getLocaleByName(localeName)
        if (m) {
            moment.locale(localeName)
            if (m.__esModule) {
                dispatch({ type: SET_LOCALE.SUCCESS, locale: m.default })
            } else {
                dispatch({ type: SET_LOCALE.SUCCESS, locale: m as Locale })
            }
        }
    } catch (error) {
        dispatch({ type: SET_LOCALE.FAILURE, error })
    }
}
