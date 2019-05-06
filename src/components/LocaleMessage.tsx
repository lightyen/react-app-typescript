import React from "react"
import { FormattedMessage } from "react-intl"
import { Glossary } from "~/typings/i18n"
/**
 * 在地化格式字串。使用方式請見︰
 * @link https://github.com/yahoo/react-intl/wiki/Components#formattedmessage
 */
export default function LocaleMessage(props: FormattedMessage.Props<Glossary>) {
    return <FormattedMessage<Glossary> {...props} />
}
