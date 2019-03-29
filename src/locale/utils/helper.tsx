import React from "react"
import { FormattedMessage, InjectedIntlProps } from "react-intl"
import { Glossary, Locale, LocaleModule } from "../languages"

export type InjectedIntlProps = InjectedIntlProps<Glossary>

/**
 * http://www.lingoes.net/en/translator/langcode.htm
 */
import { AppLocale } from ".."

export async function getLocaleByName(lang: AppLocale): Promise<LocaleModule> {
    const l = lang.toLocaleLowerCase().split(/-/)
    switch (l[0]) {
        case "en":
            return await import("~/locale/languages/en-US")
        case "zh":
            switch (l[1]) {
                case "tw":
                    return await import("~/locale/languages/zh-TW")
                case "cn":
                    return await import("~/locale/languages/zh-CN")
                default:
                    return await import("~/locale/languages/zh-TW")
            }
        default:
            return await import("~/locale/languages/en-US")
    }
}

/**
 * 在地化格式字串。使用方式請見︰
 * {@link https://github.com/yahoo/react-intl/wiki/Components#formattedmessage }
 */
export function LocaleMessage(props: FormattedMessage.Props<Glossary>) {
    return <FormattedMessage<Glossary> {...props} />
}
