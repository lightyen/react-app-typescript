import React from "react"
import { FormattedMessage, InjectedIntlProps } from "react-intl"
import { Glossary, Locale, LocaleModule } from "../languages"

export type InjectedIntlProps = InjectedIntlProps<Glossary>

/**
 * http://www.lingoes.net/en/translator/langcode.htm
 */
import { AppLocale } from ".."
const en_US = import("~/locale/languages/en-US")
const zh_TW = import("~/locale/languages/zh-TW")
const zh_CN = import("~/locale/languages/zh-CN")

export async function getLocaleByName(lang: AppLocale): Promise<LocaleModule> {
    const l = lang.toLocaleLowerCase().split(/-/)
    switch (l[0]) {
        case "en":
            return await en_US
        case "zh":
            switch (l[1]) {
                case "tw":
                    return await zh_TW
                case "cn":
                    return await zh_CN
                default:
                    return await zh_TW
            }
        default:
            return await en_US
    }
}

/**
 * 在地化格式字串。使用方式請見︰
 * {@link https://github.com/yahoo/react-intl/wiki/Components#formattedmessage }
 */
export function LocaleMessage(props: FormattedMessage.Props<Glossary>) {
    return <FormattedMessage<Glossary> {...props} />
}
