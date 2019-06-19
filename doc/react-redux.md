# react-redux 的使用姿勢

一般情況：

```tsx
import React from "react"
import { connect } from "react-redux"
import { bindActionCreators, Dispatch } from "redux"
import { doSomething1, doSomething2, doSomething3 } from "~/store/my/actions"
import { AppStore } from "~/store"
import { MyStore } from "~/store/my"
import { DispatchProps } from "~/typings"

const actionCreators = {
    doSomething1,
    doSomething2,
    doSomething3,
    // ...
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch)

type StateProps = Pick<MyStore, "state1" | "state2" | "state3">
const mapStateToProps = (state: AppStore, ownProps: OwnProps): StateProps => {
    const { state1, state2, state3 } = state.me
    return  { state1, state2, state3 }
}

type Props = DispatchProps<typeof actionCreators> & StateProps

const MyComponent: React.FC<Props> = ({ state1, state2, state3, doSomething1, doSomething2, doSomething3 }) => {
    // ...
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent)
```

也許我們不關心 state：

```tsx
import React from "react"
import { connect } from "react-redux"
import { bindActionCreators, Dispatch } from "redux"
import { doSomething1, doSomething2, doSomething3 } from "~/store/my/actions"
import { DispatchProps } from "~/typings"

const actionCreators = {
    doSomething1,
    doSomething2,
    doSomething3,
    // ...
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch)

type Props = DispatchProps<typeof actionCreators>

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
import { doSomething1, doSomething2, doSomething3 } from "~/store/my/actions"
import { AppStore } from "~/store"

const actionCreators = {
    doSomething1,
    doSomething2,
    doSomething3,
    // ...
}

function useActions(): DispatchProps<typeof actionCreators> {
    const dispatch = useDispatch()
    return React.useMemo(() => bindActionCreators(actionCreators, dispatch), [dispatch])
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

with react-hot-loader:

```tsx
import { setConfig, cold } from "react-hot-loader"
setConfig({
    pureSFC: true,
    onComponentCreate: (type, name) =>
        (String(type).indexOf("useDispatch") > 0 ||
            String(type).indexOf("useSelector") > 0 ||
            String(type).indexOf("useStore") > 0) &&
        cold(type),
})

```

## tracking issue

- 使用 hook 時在 react-hot-reloader 會有 remount 現象發生。
- https://github.com/gaearon/react-hot-loader/issues/1088#issuecomment-433537974
- https://github.com/gaearon/react-hot-loader/issues/1207
