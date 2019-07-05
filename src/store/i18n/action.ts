import { CustomLocale } from "~/typings/i18n"

export enum SET_LOCALE {
    REQUEST = "SET_LOCALE_REQUEST",
    SUCCESS = "SET_LOCALE_SUCCESS",
    FAILURE = "SET_LOCALE_FAILURE",
}

export interface SetLocaleAction {
    type: SET_LOCALE.REQUEST
    localeName: string
}

export const setLocale = (localeName: string): SetLocaleAction => {
    return { type: SET_LOCALE.REQUEST, localeName }
}

export type SagaSetLocaleAction =
    | {
          type: SET_LOCALE.SUCCESS
          locale: CustomLocale
      }
    | {
          type: SET_LOCALE.FAILURE
          error: unknown
      }

type Action = SetLocaleAction | SagaSetLocaleAction
export default Action
