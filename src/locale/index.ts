/** 語言名稱對照表 */
export type AppLocaleList = typeof appLocaleList

/** 語言集 */
export type AppLocale = keyof AppLocaleList

/** 語言名稱對照表 */
export const appLocaleList = {
    en: "English",
    "zh-TW": "正體中文",
}

/** 字彙表 */
export interface Glossary {
    text: string
}
