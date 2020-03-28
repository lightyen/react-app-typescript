import React from "react"
import classnames from "classnames"
import { useSelector, useAction } from "~/store"

const AppHeader: React.FC = () => {
    const { setCollapsed } = useAction().app
    const collapsed = useSelector(state => state.app.collapsed)

    return (
        <div className="h-100 row align-items-center flex-nowrap" style={{ background: "#20232a" }}>
            <div className="flex-grow-1">
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
                    <Breadcrumbs className="mb-auto flex-nowrap text-nowrap bg-transparent" />
                </div>
            </div>
        </div>
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
