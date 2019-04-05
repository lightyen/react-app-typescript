import { Locale as L } from "react-intl"
export type Locale = L<Glossary>

/** 字彙表 */
export type Glossary = Record<"text", string>

export interface Module<T> {
    __esModule?: boolean
    default?: T
}
