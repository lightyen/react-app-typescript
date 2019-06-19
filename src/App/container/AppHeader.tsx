import React from "react"
import styled from "styled-components"
import classnames from "classnames"
import { DispatchProps } from "~/typings"

import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"
import { AppStore } from "~/store"
import { setLocale, IntlStore } from "~/store/i18n"

// function useActions() {
//     const dispatch = useDispatch()
//     return React.useMemo(() => bindActionCreators({ setLocale }, dispatch), [dispatch])
// }

// function useSelectors() {
//     return {
//         enable: useSelector((state: AppStore) => state.intl.enable),
//         list: useSelector((state: AppStore) => state.intl.list),
//         locale: useSelector((state: AppStore) => state.intl.locale),
//     }
// }

const actionCreators = {
    setLocale,
}
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch)

type StateProps = Pick<IntlStore, "enable" | "list" | "locale">
const mapStateToProps = (state: AppStore): StateProps => {
    const { enable, list, locale } = state.intl
    return { enable, list, locale }
}

type Props = DispatchProps<typeof actionCreators> & StateProps

const Header = styled.header`
    background: #20232a;
`

const AppHeader: React.FC<Props> = ({ setLocale, enable, list, locale }) => {
    // const { setLocale } = useActions()
    // const { enable, list, locale } = useSelectors()

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
                                    setLocale(key)
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
