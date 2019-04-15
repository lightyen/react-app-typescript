/** 語言名稱對照表 */
export const appLocaleList = {
    "en-US": "English",
    "zh-TW": "正體中文",
    "zh-CN": "简体中文",
}

/** 語言名稱對照表 */
export type AppLocaleList = typeof appLocaleList

/** 語言集 */
export type AppLocale = keyof AppLocaleList

export const defaultLocale: AppLocale = "en-US"
