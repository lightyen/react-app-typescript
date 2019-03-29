import React from "react"
import { FormattedMessage, InjectedIntlProps } from "react-intl"
import { Glossary, Locale } from "../languages"

export type InjectedIntlProps = InjectedIntlProps<Glossary>

// https://docs.microsoft.com/en-us/cpp/c-runtime-library/language-strings

import en_US from "~/locale/languages/en-US"
import zh_TW from "~/locale/languages/zh-TW"
import { AppLocale } from ".."

export function getLocaleByName(lang: AppLocale): Locale {
    switch (lang) {
        case "en":
            return en_US
        case "zh-TW":
            return zh_TW
        default:
            return en_US
    }
}

/** 使用在地化格式字串。使用方法請見：@type {FormattedMessage} */
export function LocaleMessage(props: FormattedMessage.Props<Glossary>) {
    return <FormattedMessage<Glossary> {...props} />
}
