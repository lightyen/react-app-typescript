export enum SET_LOCALE {
    REQUEST = "SET_LOCALE_REQUEST",
    SUCCESS = "SET_LOCALE_SUCCESS",
    FAILURE = "SET_LOCALE_FAILURE",
}

export const setLocale = (localeName: string) => {
    return { type: SET_LOCALE.REQUEST, localeName }
}

export type SagaAction = ReturnType<typeof setLocale>
