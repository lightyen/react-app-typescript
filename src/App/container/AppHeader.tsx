import React from "react"

import { ActionCreatorsMapObject, Dispatch } from "redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { IAppStore } from "~/store"
import { IntlThunkAction, setLocale, IntlStore } from "~/store/i18n"

interface DispatchProps extends ActionCreatorsMapObject<IntlThunkAction> {
    setLocale: typeof setLocale
}

type PickProps = Partial<Pick<IntlStore, "enable" | "list" | "locale">>
const mapStateToProps = (state: IAppStore, ownProps: IOwnProps): PickProps => {
    const { enable, list, locale } = state.intl
    return {
        enable,
        list,
        locale,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators<IntlThunkAction, DispatchProps>({ setLocale }, dispatch)

type IProps = IOwnProps & DispatchProps & PickProps

interface IOwnProps {}

function AppHeader(props: IProps) {
    const { enable, list, locale, setLocale } = props
    const keys = Object.keys(list) as (keyof typeof list)[]
    return (
        <div className="d-flex w-100">
            <span className="flex-grow-1" />
            {enable ? (
                <span className="dropdown flex-grow-0">
                    <button className="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
                        {list[locale.locale]}
                    </button>
                    <div className="dropdown-menu">
                        {keys.map(key => (
                            <button
                                className="dropdown-item"
                                key={key}
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation()
                                    setLocale(key)
                                }}
                            >
                                {list[key]}
                            </button>
                        ))}
                    </div>
                </span>
            ) : null}
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppHeader)
