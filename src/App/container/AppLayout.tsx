import React, { useMemo } from "react"
import { RouteComponentProps, Route, Switch, Redirect } from "react-router-dom"
import styled from "styled-components"
import routes from "~/routes"

// Component
import AppSidebar from "./AppSidebar"
import AppHeader from "./AppHeader"
import AppFooter from "./AppFooter"
import { Loading } from "~/components/Spinner"

// Store
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { RootStore } from "~/store"
import { setSashLeft } from "~/store/app"
import { DispatchProps } from "~/typings"

const actionCreators = { setSashLeft }

function useActions(): DispatchProps<typeof actionCreators> {
    const dispatch = useDispatch()
    return useMemo(() => bindActionCreators(actionCreators, dispatch), [dispatch])
}

function useSelectors() {
    return {
        collapsed: useSelector((state: RootStore) => state.app.collapsed),
        sashLeft: useSelector((state: RootStore) => state.app.sashLeft),
    }
}

const App = styled.article`
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`

const Header = styled.header.attrs(props => ({ className: "container-fluid" }))`
    flex-grow: 0;
`

const AppBody = styled.section`
    flex-grow: 1;
    display: flex;
    flex-direction: row;
`

interface SidebarProps {
    collapsed: boolean
    width: number
}

const Sidebar = styled.aside.attrs<SidebarProps>(({ width, collapsed }) => ({
    style: {
        maxWidth: `${width}px`,
        marginLeft: `${collapsed ? -width : 0}px`,
    },
}))<SidebarProps>`
    flex-grow: 0;
    position: relative;
    width: 100%;
    transition: margin-left 0.25s ease;
`

const Content = styled.section`
    flex-grow: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`

const Main = styled.main`
    position: absolute;
    height: 100%;
    min-width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`

const AppContent = styled.div.attrs(props => ({ className: "container-fluid py-3" }))`
    flex-grow: 1;
`

const Footer = styled.footer`
    flex-grow: 0;
`

interface SashProps {
    width: number
    left: number
}

const Sash = styled.div.attrs<SashProps>(({ width, left }) => ({
    style: {
        width: `${width}px`,
        left: `${left}px`,
    },
}))<SashProps>`
    height: 100%;
    display: flex;
    position: absolute;
    cursor: ew-resize;
    z-index: 50;
`

const Sashbar: React.FC<{ left: number }> = ({ left }) => {
    const { setSashLeft } = useActions()

    const active = React.useRef<boolean>(false)

    const width = 10
    const ref = React.useRef<HTMLDivElement>()

    function handleMouseDown(e: React.MouseEvent) {
        e.preventDefault()
        active.current = true
    }

    React.useEffect(() => {
        const onup = (e: MouseEvent) => {
            e.preventDefault()
            active.current = false
        }
        const onmove = (e: MouseEvent) => {
            if (!active.current) {
                return
            }
            e.preventDefault()
            if (e.clientX >= 150 && e.clientX < 600) {
                setSashLeft(e.clientX)
            }
        }
        document.addEventListener("mousemove", onmove)
        document.addEventListener("mouseup", onup)
        return () => {
            document.removeEventListener("mousemove", onmove)
            document.removeEventListener("mouseup", onup)
        }
    }, [setSashLeft])

    return <Sash ref={ref} width={width} left={left - width / 2} onMouseDown={handleMouseDown} />
}

const AppLayout: React.FC<RouteComponentProps> = ({ ...rest }) => {
    const { collapsed, sashLeft } = useSelectors()
    return (
        <App className="fadeIn">
            <Header>
                <AppHeader />
            </Header>
            <AppBody>
                <Sidebar width={sashLeft} collapsed={collapsed}>
                    <Sashbar left={sashLeft} />
                    <AppSidebar {...rest} />
                </Sidebar>
                <Content>
                    <Main>
                        <AppContent>
                            <React.Suspense fallback={Loading}>
                                <Switch>
                                    {routes.map(
                                        (route, index) =>
                                            !!route.component && (
                                                <Route
                                                    key={index}
                                                    path={route.path}
                                                    exact={route.exact}
                                                    render={props => <route.component {...props} />}
                                                />
                                            ),
                                    )}
                                    <Redirect to="/404" />
                                </Switch>
                            </React.Suspense>
                        </AppContent>
                        <Footer>
                            <AppFooter />
                        </Footer>
                    </Main>
                </Content>
            </AppBody>
        </App>
    )
}

export default AppLayout
