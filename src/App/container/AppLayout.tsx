import React from "react"
import { Route } from "react-router-dom"
import styled from "styled-components"

const App = styled.div`
    font-family: My Code, monospace;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

const AppHeaderContainer = styled.div`
    height: 50px;
`

const AppBodyContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    margin-top: 50px;
`

const AppSidebarContainer = styled.div`
    position: fixed;
    max-width: 200px;
    width: 100%;
    z-index: 100;
    height: calc(100vh - 50px);
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
    flex: 0 0 50px;
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

export default function AppLayout() {
    const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    return (
        <App>
            <AppHeaderContainer className="navbar fixed-top navbar-light bg-light">
                <React.Suspense fallback={loading()}>
                    <AppHeader />
                </React.Suspense>
            </AppHeaderContainer>
            <AppBodyContainer>
                <AppSidebarContainer className="bg-info text-light">
                    <AppSidebar />
                </AppSidebarContainer>
                <AppMain>
                    <React.Suspense fallback={loading()}>
                        <Route path="/" component={Main} />
                    </React.Suspense>
                </AppMain>
            </AppBodyContainer>
            <AppFooterContainer className="navbar navbar-dark bg-dark text-light">
                <React.Suspense fallback={loading()}>
                    <AppFooter />
                </React.Suspense>
            </AppFooterContainer>
        </App>
    )
}
