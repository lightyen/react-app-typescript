import * as types from "../actionTypes"

export const setLocale = (localeName: string) => {
    return { type: types.SET_LOCALE.REQUEST, localeName }
}
