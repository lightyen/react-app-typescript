import React from "react"
import { IntlProvider, addLocaleData } from "react-intl"
import { connect } from "react-redux"

import { RootStore } from "~/store"
import { Glossary } from "~/typings/i18n"

interface IOwnProps {}

type StateProps = IntlProvider.Props<Glossary>

const mapStateToProps = (state: RootStore, ownProps: IOwnProps): StateProps => {
    const { locale } = state.intl
    addLocaleData(locale)
    return {
        key: locale.locale,
        locale: locale ? locale.locale : "en-US",
        messages: locale ? locale.fields : null,
    }
}

export default connect(mapStateToProps)(IntlProvider)
