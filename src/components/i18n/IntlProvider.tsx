import React from "react"
import { IntlProvider, addLocaleData } from "react-intl"
import { connect } from "react-redux"

import { IAppStore } from "~/store"
import { defaultLocale } from "~/locale"
import { Glossary } from "~/locale/languages"

interface IOwnProps {}

type PickProps = IntlProvider.Props<Glossary>

const mapStateToProps = (state: IAppStore, ownProps: IOwnProps): PickProps => {
    const { locale } = state.intl
    addLocaleData(locale)
    return {
        locale: locale ? locale.locale : defaultLocale,
        messages: locale ? locale.fields : null,
    }
}

export default connect(mapStateToProps)(IntlProvider)
