import { IntlProvider, addLocaleData } from "react-intl"
import { connect } from "react-redux"

import { IAppStore } from "~/store/redux"
import { Glossary } from "~/locale"

interface IOwnProps {}

type PickProps = IntlProvider.Props<Glossary> & { key: React.Key }

const mapStateToProps = (state: IAppStore, ownProps: IOwnProps): PickProps => {
    const { locale } = state.intl
    addLocaleData(locale)
    return {
        key: locale.locale,
        locale: locale.locale,
        messages: locale.fields,
        defaultLocale: "en",
    }
}

export default (connect(mapStateToProps) as any)(IntlProvider)
