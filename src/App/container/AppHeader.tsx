import React from "react"
import styled from "styled-components"
import classnames from "classnames"
import { DispatchProps } from "~/typings"

// Store
import { bindActionCreators } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { RootStore } from "~/store"
import { setLocale } from "~/store/i18n"
import { setCollapsed } from "~/store/app"

const actionCreators = {
    setLocale,
    setCollapsed,
}

function useActions(): DispatchProps<typeof actionCreators> {
    const dispatch = useDispatch()
    return React.useMemo(() => bindActionCreators(actionCreators, dispatch), [dispatch])
}

function useSelectors() {
    return {
        collapsed: useSelector((state: RootStore) => state.app.collapsed),
        enable: useSelector((state: RootStore) => state.intl.enable),
        list: useSelector((state: RootStore) => state.intl.list),
        locale: useSelector((state: RootStore) => state.intl.locale),
    }
}

const Header = styled.header`
    background: #20232a;
`

const AppHeader: React.FC = () => {
    const { setLocale, setCollapsed } = useActions()
    const { collapsed, enable, list, locale } = useSelectors()

    const keys = Object.keys(list) as (keyof typeof list)[]
    return (
        <Header className="row align-items-center h-100">
            <div className="col flex-grow-1">
                <div className="d-flex flex-row align-items-center">
                    <button
                        className="btn btn-muted"
                        onClick={e => {
                            e.stopPropagation()
                            setCollapsed(!collapsed)
                        }}
                    >
                        <i className="text-light fa fa-bars" />
                    </button>
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

export default AppHeader

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
