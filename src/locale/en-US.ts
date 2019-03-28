import { Locale } from "react-intl"
import { LanguageFields } from "./utils"

const locale: Locale<LanguageFields> = {
    locale: "en-US",
    pluralRuleFunction: () => "",
    fields: {
        text: "helloworld",
    },
}

export default locale
