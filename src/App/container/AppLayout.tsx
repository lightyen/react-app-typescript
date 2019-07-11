import React from "react"
import { RouteComponentProps, Route, Switch, Redirect } from "react-router-dom"
import styled from "styled-components"
import routes from "~/routes"

// Component
import AppSidebar from "./AppSidebar"
import AppHeader from "./AppHeader"
import AppFooter from "./AppFooter"
import { Loading } from "~/components/Spinner"

// Store
import * as ReactRedux from "react-redux"
import { RootStore } from "~/store"

function useSelectors() {
    return {
        collapsed: ReactRedux.useSelector((state: RootStore) => state.app.collapsed),
    }
}

const App = styled.div`
    font-family: My Code, monospace;
    min-height: 100vh;
    color: #f9f9f9;
    background: #282c34;
`

interface AppHeaderProps {
    height: number
}

const AppHeaderContainer = styled.div.attrs({ className: "fixed-top container-fluid" })<AppHeaderProps>`
    height: ${props => props.height}px;
`

interface AppMainContainerProps {
    headerHeight: number
}

const AppMainContainer = styled.div<AppMainContainerProps>`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    margin-top: ${props => props.headerHeight}px;
`

interface AppSidebarContainerProps {
    collapsed: boolean
    width: number
    headerHeight: number
}

const AppSidebarContainer = styled.div<AppSidebarContainerProps>`
    position: fixed;
    max-width: ${props => props.width}px;
    width: 100%;
    z-index: 100;
    height: calc(100vh - ${props => props.headerHeight}px);
    transition: margin-left 0.25s;
    margin-left: -${props => props.width}px;
    margin-left: ${props => (props.collapsed ? -props.width : 0)}px;
`

interface AppBodyProps {
    collapsed: boolean
    sidebarWidth: number
}

const AppBody = styled.div<AppBodyProps>`
    width: 100%;
    transition: margin-left 0.25s;
    margin-left: 0;
    margin-left: ${props => (props.collapsed ? 0 : props.sidebarWidth)}px;
`

interface AppFooterContainerProps {
    collapsed: boolean
    sidebarWidth: number
}

const AppFooterContainer = styled.footer<AppFooterContainerProps>`
    transition: margin-left 0.25s;
    margin-left: ${props => (props.collapsed ? 0 : props.sidebarWidth)}px;
`

const AppLayout: React.FC<RouteComponentProps> = ({ ...rest }) => {
    const headerHeight = 70
    const sidebarWidth = 200
    const { collapsed } = useSelectors()

    return (
        <App className="d-flex flex-column">
            <AppHeaderContainer height={headerHeight}>
                <AppHeader />
            </AppHeaderContainer>
            <AppMainContainer headerHeight={headerHeight}>
                <AppSidebarContainer width={sidebarWidth} headerHeight={headerHeight} collapsed={collapsed}>
                    <AppSidebar {...rest} />
                </AppSidebarContainer>
                <AppBody sidebarWidth={sidebarWidth} collapsed={collapsed}>
                    <React.Suspense fallback={Loading}>
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
                            <Redirect to="/404" />
                        </Switch>
                    </React.Suspense>
                </AppBody>
            </AppMainContainer>
            <AppFooterContainer sidebarWidth={sidebarWidth} collapsed={collapsed}>
                <AppFooter />
            </AppFooterContainer>
        </App>
    )
}

export default AppLayout
