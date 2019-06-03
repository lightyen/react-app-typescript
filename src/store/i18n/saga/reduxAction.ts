import { IAsyncAction } from "~/store/utils"
import { SET_LOCALE } from "../actionTypes"
import { CustomLocale } from "~/typings/i18n"

export type SetLocaleAction = IAsyncAction<
    SET_LOCALE.REQUEST,
    SET_LOCALE.FAILURE,
    SET_LOCALE.SUCCESS,
    {
        locale: CustomLocale
    }
>

export type ReduxAction = SetLocaleAction
