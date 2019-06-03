import React from "react"
import styled from "styled-components"
import classnames from "classnames"

import { Dispatch } from "redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { IAppStore } from "~/store"
import { IntlStore, setLocale } from "~/store/i18n"

interface OwnProps {}

const dispatchProps = {
    setLocale,
}

type DispatchProps = typeof dispatchProps

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(dispatchProps, dispatch)

type StateProps = Partial<Pick<IntlStore, "enable" | "list" | "locale">>
const mapStateToProps = (state: IAppStore, ownProps: OwnProps): StateProps => {
    const { enable, list, locale } = state.intl
    return {
        enable,
        list,
        locale,
    }
}

type IProps = OwnProps & DispatchProps & StateProps

const Header = styled.header`
    background: #20232a;
`

function AppHeader(props: IProps) {
    const { enable, list, locale } = props
    const keys = Object.keys(list) as (keyof typeof list)[]
    return (
        <Header className="row align-items-center h-100">
            <div className="col flex-grow-1">
                <div className="row ">
                    <Breadcrumbs className="mb-auto bg-transparent" />
                </div>
            </div>
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

import { Route, Link, RouteComponentProps } from "react-router-dom"
import { getRouteName } from "~/routes"

interface BreadcrumbsProps {
    className?: string
}

const BreadcrumbsItem: React.FC<RouteComponentProps> = ({ match }) => {
    return (
        <>
            <li className={classnames("breadcrumb-item", { active: match.isExact })}>
                {match.isExact ? (
                    <span>{getRouteName(match.url)}</span>
                ) : (
                    <Link to={match.url || ""}>{getRouteName(match.url)}</Link>
                )}
            </li>
            <Route path={`${match.url}/:path`} component={BreadcrumbsItem} />
        </>
    )
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className }) => (
    <ol className={classnames("breadcrumb", className)}>
        <li className={"breadcrumb-item"}>
            <Link to="/">{getRouteName("/")}</Link>
        </li>
        <Route path="/:path" component={BreadcrumbsItem} />
    </ol>
)
