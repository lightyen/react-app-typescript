import { Locale, IntlProvider, addLocaleData } from "react-intl"
import zhLocaleData from "react-intl/locale-data/zh"
import { AppLanguage, LanguageFields } from "./index"

import en_US from "~/locale/en-US"
import zh_TW from "~/locale/zh-TW"

export function getLocaleByName(lang: AppLanguage): Locale<LanguageFields> {
    switch (lang) {
        case "en-US":
            return en_US
        case "zh-TW":
            return zh_TW
        default:
            return en_US
    }
}

// function getProviderProps(lang: AppLanguage): IntlProvider.Props {
//     addLocaleData(getLocaleByName(lang))
// }
