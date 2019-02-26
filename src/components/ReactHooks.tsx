// Hooks FAQ
// https://reactjs.org/docs/hooks-faq.html

import React from "react"
import { Example } from "./Example"

interface IProps {}

interface IData {
    count: number
    text: string
}

export const Counter: React.FunctionComponent<IProps> = props => {
    const createData = (): IData => {
        // console.log("create Data")
        return { count: 3, text: "" }
    }

    // createData is only called once
    const [data, setData] = React.useState<IData>(createData)

    React.useEffect(() => {
        // subscribe something
        return () => {
            // unsubscribe something
        }
    }, [])

    React.useEffect(() => {
        // console.log("data.count next = " + data.count)
        return () => {
            // console.log("data.count prev = " + data.count)
        }
    }, [data.count])

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
