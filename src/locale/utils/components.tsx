import React from "react"

import { Glossary } from "../index"
import { FormattedMessage } from "react-intl"

/** 使用在地化格式字串。使用方法請見：@type {FormattedMessage} */
export function LocaleMessage(props: FormattedMessage.Props<Glossary>) {
    return <FormattedMessage<Glossary> {...props} />
}
