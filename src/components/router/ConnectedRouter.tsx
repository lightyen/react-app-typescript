import React, { Dispatch } from "react"
import { Router } from "react-router"
import { History, Location, Action } from "history"
import { Store, AnyAction } from "redux"
import { connect, ReactReduxContext } from "react-redux"
import { onLocationChanged, IRouterAction } from "~/store/router"
import { IAppStore } from "~/store"

interface DispatchProps {
    onLocationChanged?: (location: Location, action: Action, isFirstRendering: boolean) => void
}

interface OwnProps {
    history: History
}

interface ConnectedRouterProps extends DispatchProps, OwnProps {
    store: Store<IAppStore> & { dispatch: Dispatch<AnyAction> }
    basename?: string
}

const ConnectedRouter: React.FunctionComponent<ConnectedRouterProps> = ({
    store,
    history,
    children,
    onLocationChanged,
}) => {
    let inTimeTravelling = false

    const handleLocationChange = (location: Location, action: Action, isFirstRendering = false) => {
        // Dispatch onLocationChanged except when we're in time travelling
        if (inTimeTravelling) {
            inTimeTravelling = false
            return
        }
        onLocationChanged(location, action, isFirstRendering)
    }

    React.useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const storeState = store.getState()
            const { pathname: pathnameInStore, search: searchInStore, hash: hashInStore } = storeState.router.location
            const { pathname: pathnameInHistory, search: searchInHistory, hash: hashInHistory } = history.location

            // If we do time travelling, the location in store is changed but location in history is not changed
            if (
                pathnameInHistory !== pathnameInStore ||
                searchInHistory !== searchInStore ||
                hashInHistory !== hashInStore
            ) {
                inTimeTravelling = true
                // Update history's location to match store's location
                history.push({
                    pathname: pathnameInStore,
                    search: searchInStore,
                    hash: hashInStore,
                })
            }
        })
        const unlisten = history.listen(handleLocationChange)
        return () => {
            unsubscribe()
            unlisten()
        }
    }, [])

    return <Router history={history}>{children}</Router>
}

const mapDispatchToProps = (dispatch: Dispatch<IRouterAction>, ownProps: OwnProps) => ({
    onLocationChanged: (location: Location, action: Action, isFirstRendering: boolean) =>
        dispatch(onLocationChanged(location, action, isFirstRendering)),
})

const ConnectedRouterWithContext: React.FunctionComponent<OwnProps & DispatchProps> = props => {
    const Context = ReactReduxContext
    return <Context.Consumer>{({ store }) => <ConnectedRouter store={store} {...props} />}</Context.Consumer>
}

export default connect(
    null,
    mapDispatchToProps,
)(ConnectedRouterWithContext)
