import React from "react"
/**
 * http://www.lingoes.net/en/translator/langcode.htm
 */
import { FormattedMessage, InjectedIntlProps } from "react-intl"
import { AppLocale } from ".."
import { Glossary, Module, Locale } from "../languages"

export type InjectedIntlProps = InjectedIntlProps<Glossary>

const en_US = () => import("~/locale/languages/en-US")
const zh_TW = () => import("~/locale/languages/zh-TW")
const zh_CN = () => import("~/locale/languages/zh-CN")

export function getLocaleByName(lang: AppLocale): Promise<Module<Locale>> {
    const l = lang.toLocaleLowerCase().split(/-/)
    switch (l[0]) {
        case "en":
            return en_US()
        case "zh":
            switch (l[1]) {
                case "tw":
                    return zh_TW()
                case "cn":
                    return zh_CN()
                default:
                    return zh_TW()
            }
        default:
            return en_US()
    }
}

/**
 * 在地化格式字串。使用方式請見︰
 * {@link https://github.com/yahoo/react-intl/wiki/Components#formattedmessage }
 */
export function LocaleMessage(props: FormattedMessage.Props<Glossary>) {
    return <FormattedMessage<Glossary> {...props} />
}
