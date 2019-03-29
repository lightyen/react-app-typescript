import { Locale } from "react-intl"
import { AppLocale, Glossary } from "../index"
// import zhLocaleData from "react-intl/locale-data/zh"

// i18n https://docs.microsoft.com/en-us/cpp/c-runtime-library/language-strings

import en_US from "~/locale/languages/en-US"
import zh_TW from "~/locale/languages/zh-TW"

export function getLocaleByName(lang: AppLocale): Locale<Glossary> {
    switch (lang) {
        case "en":
            return en_US
        case "zh-TW":
            return zh_TW
        default:
            return en_US
    }
}
