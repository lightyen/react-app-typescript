import { Reducer } from "redux"
import { Locale } from "react-intl"

import { IntlAction, SET_LOCALE } from "./action"
import en_US from "~/locale/languages/en-US"
import zh_TW from "~/locale/languages/zh-TW"
import { AppLocaleList, appLocaleList, Glossary } from "~/locale"
import { getLocaleByName } from "~/locale/utils"

type IntlActionType = typeof SET_LOCALE

interface IntlStoreType {
    /** 啟用多國語言 */
    enable: boolean
    /** 當前在地化語言 */
    locale: Locale<Glossary>
    /** 可提供的語言列表 */
    list: AppLocaleList

    /** 請求狀態 */
    status?: IntlActionType
    /** 錯誤訊息 */
    error?: any
}

export type IntlStore = Readonly<IntlStoreType>

const init: IntlStore = {
    enable: true,
    locale: en_US,
    list: appLocaleList,
}

export const intlReducer: Reducer<IntlStore, IntlAction> = (state = init, action): IntlStore => {
    switch (action.type) {
        // set locale
        case SET_LOCALE.SUCCESS:
            if (!state.enable) {
                return state
            }
            return { ...state, status: SET_LOCALE, error: null, locale: getLocaleByName(action.localeName) }

        // default
        default:
            return state
    }
}
