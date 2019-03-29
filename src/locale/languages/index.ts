import { Locale as L } from "react-intl"
export type Locale = L<Glossary>

/** 字彙表 */
export interface Glossary {
    text: string
}

export interface LocaleModule {
    __esModule?: boolean
    default?: Locale
}
