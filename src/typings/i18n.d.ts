import ReactIntl from "react-intl"
import { appLocaleList } from "~/utils/i18n"

/** 字彙表 */
export interface Glossary {
    text: string
    hello: string
}

interface Module<T> {
    __esModule?: boolean
    default?: T
}

export type CustomLocale = ReactIntl.Locale<Glossary>
export type CustomModule = Module<CustomLocale>

/** 語言名稱對照表 */
export type AppLocaleList = typeof appLocaleList

/** 語言集 */
export type AppLocale = keyof AppLocaleList

export type CustomInjectedIntlProps = ReactIntl.InjectedIntlProps<Glossary>
