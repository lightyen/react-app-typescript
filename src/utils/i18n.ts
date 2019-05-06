/**
 * http://www.lingoes.net/en/translator/langcode.htm
 */
import { AppLocale, CustomModule } from "~/typings/i18n"

/** 語言名稱對照表 */
export const appLocaleList = {
    "en-US": "English",
    "zh-TW": "正體中文",
    "zh-CN": "简体中文",
}

const enUS = () => import("~/languages/en-US")
const zhTW = () => import("~/languages/zh-TW")
const zhCN = () => import("~/languages/zh-CN")

export function getLocaleByName(lang: AppLocale): Promise<CustomModule> {
    const l = lang.toLocaleLowerCase().split(/-/)
    switch (l[0]) {
        case "en":
            return enUS()
        case "zh":
            switch (l[1]) {
                case "tw":
                    return zhTW()
                case "cn":
                    return zhCN()
                default:
                    return zhTW()
            }
        default:
            return enUS()
    }
}
