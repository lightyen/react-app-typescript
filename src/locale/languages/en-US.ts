import { Locale } from "react-intl"
import { Glossary } from "../index"

const locale: Locale<Glossary> = {
    locale: "en-US",
    pluralRuleFunction: () => "",
    fields: {
        text: "helloworld",
    },
}

export default locale
