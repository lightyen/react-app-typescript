import { IntlProvider, addLocaleData } from "react-intl"
import { connect } from "react-redux"

import { IAppStore } from "~/store"
import { Glossary } from "~/locale/languages"

interface IOwnProps {}

type PickProps = IntlProvider.Props<Glossary>

const mapStateToProps = (state: IAppStore, ownProps: IOwnProps): PickProps => {
    const { locale } = state.intl
    addLocaleData(locale)
    return {
        locale: locale.locale,
        messages: locale.fields,
    }
}

export default connect(mapStateToProps)(IntlProvider)
