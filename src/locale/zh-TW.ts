import { Locale } from "react-intl"
import { LanguageFields } from "./utils"

const locale: Locale<LanguageFields> = {
    locale: "zh-TW",
    pluralRuleFunction: () => "",
    fields: {
        text: "你好阿！",
    },
}

export default locale
