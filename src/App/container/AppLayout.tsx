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
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { RootStore } from "~/store"
import { setSashLeft } from "~/store/app"
import { DispatchProps } from "~/typings"

const actionCreators = { setSashLeft }

function useActions(): DispatchProps<typeof actionCreators> {
    const dispatch = useDispatch()
    return React.useMemo(() => bindActionCreators(actionCreators, dispatch), [dispatch])
}

function useSelectors() {
    return {
        collapsed: useSelector((state: RootStore) => state.app.collapsed),
        sashLeft: useSelector((state: RootStore) => state.app.sashLeft),
    }
}

const App = styled.article`
    min-height: 100%;
    display: flex;
    flex-direction: column;
`

const Header = styled.header.attrs(props => ({ className: "container-fluid" }))`
    flex-grow: 0;
`

const Content = styled.section`
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
    display: flex;
    flex-grow: 0;
    position: relative;
    transition: margin-left 0.25s;
    width: 100%;
`

const Body = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

const Main = styled.main`
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

    const width = 6
    const ref = React.useRef<HTMLDivElement>()

    function handleMouseDown(e: React.MouseEvent) {
        active.current = true
    }

    React.useEffect(() => {
        const onup = () => {
            active.current = false
        }
        const onmove = (e: MouseEvent) => {
            if (!active.current) {
                return
            }
            if (e.clientX >= 150 && e.clientX < 400) {
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
            <Content>
                <Sidebar width={sashLeft} collapsed={collapsed}>
                    <Sashbar left={sashLeft} />
                    <AppSidebar {...rest} />
                </Sidebar>
                <Body>
                    <Main className="container-fluid py-3">
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
                    </Main>
                    <Footer>
                        <AppFooter />
                    </Footer>
                </Body>
            </Content>
        </App>
    )
}

export default AppLayout
