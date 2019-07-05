import { Reducer } from "redux"

import { appLocaleList } from "~/utils/i18n"
import { CustomLocale, AppLocaleList } from "~/typings/i18n"
import Action, { SET_LOCALE } from "./action"

interface IntlStoreType {
    /** 啟用多國語言 */
    enable: boolean
    /** 當前在地化語言 */
    locale: CustomLocale
    /** 可提供的語言列表 */
    list: AppLocaleList

    /** 請求狀態 */
    status?: SET_LOCALE
    /** 錯誤訊息 */
    error?: unknown
}

export type IntlStore = Readonly<IntlStoreType>

const init: IntlStore = {
    enable: true,
    locale: null,
    list: appLocaleList,
}

export const intlReducer: Reducer<IntlStore, Action> = (state = init, action): IntlStore => {
    switch (action.type) {
        case SET_LOCALE.REQUEST:
            return { ...state, status: SET_LOCALE.REQUEST }
        case SET_LOCALE.SUCCESS:
            return { ...state, status: SET_LOCALE.SUCCESS, locale: action.locale, error: null }
        case SET_LOCALE.FAILURE:
            return { ...state, status: SET_LOCALE.FAILURE, error: action.error }
        default:
            return state
    }
}
