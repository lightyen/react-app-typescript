# react-redux 的使用姿勢

一般情況：

```tsx
import React from "react"
import { connect, Dispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { AppStore } from "~/store"
import { MyStore } from "~/store/my"
import { doSomething1, doSomething2, doSomething3 } from "~/store/my/actions"

const actionCreators = {
    doSomething1,
    doSomething2,
    doSomething3,
    // ...
}
type DispatchProps = typeof actionCreators
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch)

type StateProps = Pick<MyStore, "state1" | "state2" | "state3">
const mapStateToProps = (state: AppStore, ownProps: OwnProps): StateProps => {
    const { state1, state2, state3 } = state.me
    return  { state1, state2, state3 }
}

type Props = DispatchProps & StateProps

const MyComponent: React.FC<Props> = ({ state1, state2, state3, doSomething1, doSomething2, doSomething3 }) => {
    // ...
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent)
```

也許我們不關心 state：

```tsx
import React from "react"
import { connect, Dispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { doSomething1, doSomething2, doSomething3 } from "~/store/my/actions"

const actionCreators = {
    doSomething1,
    doSomething2,
    doSomething3,
    // ...
}
type DispatchProps = typeof actionCreators
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch)

type Props = DispatchProps

const MyComponent: React.FC<Props> = ({ doSomething1, doSomething2, doSomething3 }) => {
    // ...
}

export default connect(null, mapDispatchToProps)(MyComponent)
```

## Hooks Version

```tsx
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { AppStore } from "~/store"
import { doSomething1, doSomething2, doSomething3 } from "~/store/my/actions"

function useActions() {
    const dispatch = useDispatch()
    return React.useMemo(
        () =>
            bindActionCreators(
                {
                    doSomething1,
                    doSomething2,
                    doSomething3,
                },
                dispatch,
            ),
        [dispatch],
    )
}

function useSelectors() {
    return {
        state1: useSelector((state: AppStore) => state.me.state1),
        state2: useSelector((state: AppStore) => state.me.state2),
        state3: useSelector((state: AppStore) => state.me.state3),
    }
}

const MyComponent: React.FC = () => {
    const { doSomething1, doSomething2, doSomething3 } = useActions()
    const { state1, state2, state3 } = useSelectors()
    // ...
}

export default MyComponent
```
