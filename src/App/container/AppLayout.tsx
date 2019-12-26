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
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { useSelector } from "~/store"
import { setSashLeft } from "~/store/app"
import { DispatchProps } from "~/typings"

const actionCreators = { setSashLeft }

function useActions(): DispatchProps<typeof actionCreators> {
    const dispatch = useDispatch()
    return useMemo(() => bindActionCreators(actionCreators, dispatch), [dispatch])
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
    max-height: 100%;
    overflow: hidden;
`

const Sidebar = styled.nav`
    height: 100%;
    flex-grow: 1;
    overflow: hidden;
`

const ScrollableSidebar = styled.div`
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 0px;
    }
    scrollbar-width: none;
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
}

const Sash = styled.div.attrs<SashProps>(({ width }) => ({
    style: {
        width: `${width}px`,
    },
}))<SashProps>`
    height: 100%;
    position: absolute;
    right: 0;
    cursor: ew-resize;
    z-index: 500;
`

const Sashbar: React.FC = () => {
    const { setSashLeft } = useActions()

    const active = React.useRef<boolean>(false)

    const width = 6
    const ref = React.useRef<HTMLDivElement>()

    function handleMouseDown(e: React.MouseEvent) {
        e.preventDefault()
        active.current = true
    }

    React.useEffect(() => {
        let handle = 0
        function update(width: number) {
            handle = window.requestAnimationFrame(update)
            setSashLeft(width)
        }
        const onup = (e: MouseEvent) => {
            e.preventDefault()
            active.current = false
        }
        const onmove = (e: MouseEvent) => {
            if (!active.current) {
                return
            }
            e.preventDefault()
            update(e.clientX)
        }
        document.addEventListener("mousemove", onmove)
        document.addEventListener("mouseup", onup)
        return () => {
            document.removeEventListener("mousemove", onmove)
            document.removeEventListener("mouseup", onup)
            window.cancelAnimationFrame(handle)
        }
    }, [setSashLeft])

    return <Sash ref={ref} width={width} onMouseDown={handleMouseDown} />
}

interface NavSideProps {
    collapsed: boolean
    width: number
}

const NavSide = styled.div.attrs<NavSideProps>(({ collapsed, width }) => ({
    style: {
        minWidth: width,
        marginLeft: `${collapsed ? -width : 0}px`,
    },
}))<NavSideProps>`
    flex-grow: 0;
    height: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
    transition: margin-left 0.25s ease;
    background: #101216;
`

const AppLayout: React.FC<RouteComponentProps> = ({ ...rest }) => {
    const collapsed = useSelector(state => state.app.collapsed)
    const sashLeft = useSelector(state => state.app.sashLeft)
    return (
        <App className="fadeIn">
            <Header>
                <AppHeader />
            </Header>
            <AppBody>
                <NavSide width={sashLeft} collapsed={collapsed}>
                    <Sidebar>
                        <ScrollableSidebar>
                            <AppSidebar {...rest} />
                        </ScrollableSidebar>
                    </Sidebar>
                    <Sashbar />
                </NavSide>
                <Content>
                    <Main>
                        <AppContent>
                            <React.Suspense fallback={Loading}>
                                <Switch>
                                    {routes.map((route, index) =>
                                        !!route.component ? (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                exact={route.exact}
                                                render={props => <route.component {...props} />}
                                            />
                                        ) : (
                                            route.render && <Route key={index} {...route} />
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
