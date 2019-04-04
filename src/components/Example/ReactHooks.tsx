// Hooks FAQ
// https://reactjs.org/docs/hooks-faq.html

import React from "react"
import { Example } from "./Example"

interface IProps {}

interface IData {
    count: number
    text: string
}

const Counter: React.FunctionComponent<IProps> = props => {
    const createData = (): IData => {
        // console.log("create Data")
        return { count: 3, text: "" }
    }

    // createData is only called once
    const [data, setData] = React.useState<IData>(createData)

    // 類似 componentDidUpdate
    React.useEffect(() => {
        // do something
    })

    // 類似 componentDidMount, componentWillUnmount
    React.useEffect(() => {
        // subscribe something
        return () => {
            // unsubscribe something
        }
    }, [])

    // 只針對 data.count 的狀態做反應
    React.useEffect(() => {
        console.log("next data.count = " + data.count)
        return () => {
            console.log("prev data.count = " + data.count)
        }
    }, [data.count])

    // 非同步的 effect
    React.useEffect(() => {
        const f = async () => {
            // await ...
        }
        f()
    }, [])

    const handleClick = () => {
        setData(prev => ({ ...prev, count: prev.count + 1 }))
    }

    return (
        <div>
            <Example content="Hook Style Component" onClick={handleClick} />
            <span>{data.count}</span>
        </div>
    )
}

export default Counter

interface IChildComponentProps {
    onClick: (e: React.MouseEvent) => void
}

const ChildComponent: React.FC<IChildComponentProps> = props => {
    // console.log("ChildComponent render")
    return <button onClick={props.onClick}>{props.children}</button>
}

const ChildComponentMemo = React.memo((props: React.PropsWithChildren<IChildComponentProps>) => (
    <ChildComponent onClick={props.onClick}>{props.children}</ChildComponent>
))

export const ParentComponent: React.FC = () => {
    const [state, setState] = React.useState({ children: [1, 2, 3] })
    const { children } = state

    function doSomething() {
        setState({ children })
    }

    const callback = React.useCallback(doSomething, [children])
    // const memo = React.useMemo(() => doSomething, [children])

    return (
        <div>
            {children.map(c => (
                <ChildComponentMemo onClick={callback} key={c}>
                    {c}
                </ChildComponentMemo>
            ))}
        </div>
    )
}
