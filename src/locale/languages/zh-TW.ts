import { Locale } from "react-intl"
import { Glossary } from "../index"

const locale: Locale<Glossary> = {
    locale: "zh-TW",
    pluralRuleFunction: () => "",
    fields: {
        text: "你好阿！",
    },
}

export default locale
