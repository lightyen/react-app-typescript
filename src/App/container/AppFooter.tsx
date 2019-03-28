import React from "react"
import { FormattedMessage } from "react-intl"

import { LanguageFields } from "~/locale/utils"

export default function AppFooter() {
    return (
        <div>
            <FormattedMessage<LanguageFields> id="text" values={{}} />
        </div>
    )
}
