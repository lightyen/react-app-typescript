import React from "react"
import styled from "styled-components"

import { ActionCreatorsMapObject, Dispatch } from "redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { IAppStore } from "~/store"
import { IntlThunkAction, IntlStore, setLocale } from "~/store/i18n"

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

const Header = styled.header`
    background: #20232a;
`

function AppHeader(props: IProps) {
    const { enable, list, locale } = props
    const keys = Object.keys(list) as Array<keyof typeof list>
    return (
        <Header className="row align-items-center h-100">
            <span className="col flex-grow-1" />
            {enable ? (
                <span className="col dropdown flex-grow-0">
                    <button className="btn text-light dropdown-toggle" data-toggle="dropdown">
                        {list[locale.locale]}
                    </button>
                    <div className="dropdown-menu">
                        {keys.map(key => (
                            <button
                                className="dropdown-item"
                                key={key}
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation()
                                    props.setLocale(key)
                                }}
                            >
                                {list[key]}
                            </button>
                        ))}
                    </div>
                </span>
            ) : null}
        </Header>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppHeader)
