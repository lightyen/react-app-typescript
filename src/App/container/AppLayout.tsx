import React from "react"
import { RouteComponentProps, Route, Switch, Redirect } from "react-router-dom"
import styled from "styled-components"
import routes from "~/routes"

import { loading } from "~/components/Loading"

const App = styled.div`
    font-family: My Code, monospace;
    min-height: 100vh;
    color: #f9f9f9;
    background: #282c34;
`

const AppHeaderContainer = styled.div`
    height: 70px;
`

const AppBodyContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    margin-top: 70px;
`

const AppSidebarContainer = styled.div`
    position: fixed;
    max-width: 200px;
    width: 100%;
    z-index: 100;
    height: calc(100vh - 70px);
    transition: margin-left 0.25s;
    margin-left: -200px;
    @media (min-width: 992px) {
        margin-left: 0;
    }
`

const AppMain = styled.div`
    width: 100%;
    transition: margin-left 0.25s;
    margin-left: 0;
    @media (min-width: 992px) {
        margin-left: 200px;
    }
`

const AppFooterContainer = styled.footer`
    transition: margin-left 0.25s;
    margin-left: 0;
    @media (min-width: 992px) {
        margin-left: 200px;
    }
`

// Component
import AppSidebar from "./AppSidebar"
const AppHeader = React.lazy(() => import("./AppHeader"))
const AppFooter = React.lazy(() => import("./AppFooter"))
const Main = React.lazy(() => import("~/views/Main"))

const AppLayout: React.FC<RouteComponentProps> = ({ ...rest }) => {
    return (
        <App className="d-flex flex-column">
            <AppHeaderContainer className="fixed-top container-fluid">
                <React.Suspense fallback={loading()}>
                    <AppHeader />
                </React.Suspense>
            </AppHeaderContainer>
            <AppBodyContainer>
                <AppSidebarContainer>
                    <AppSidebar {...rest} />
                </AppSidebarContainer>
                <AppMain>
                    <React.Suspense fallback={loading()}>
                        <Switch>
                            {routes.map((route, index) => {
                                return (
                                    !!route.component && (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            exact={route.exact}
                                            render={props => <route.component {...props} />}
                                        />
                                    )
                                )
                            })}
                            {/* <Redirect from="/" to="/dashboard" exact /> */}
                            <Redirect to="/404" />
                        </Switch>
                    </React.Suspense>
                </AppMain>
            </AppBodyContainer>
            <AppFooterContainer>
                <React.Suspense fallback={loading()}>
                    <AppFooter />
                </React.Suspense>
            </AppFooterContainer>
        </App>
    )
}

export default AppLayout
