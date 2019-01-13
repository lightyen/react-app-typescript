// NOTE: 需要把 react 更新到測試版本 yarn upgrade react@next react-dom@next

import React from "react"

interface IProps {}

interface IState {
    count: number
    text: string
}

export const ReactHookCounter: React.FunctionComponent<IProps> = props => {
    const [state, setState] = React.useState<IState>({ count: 0, text: "" })

    React.useEffect(
        () => {
            console.log("count " + state.count)
        },
        [state.text],
    )

    React.useState(null)

    React.useEffect(() => {
        console.log("mount")
        return () => {
            console.log("unmount")
        }
    }, [])

    return (
        <div>
            <span>the number is {state.count}</span>
            <button
                onClick={() => {
                    setState(prev => ({ ...prev, count: prev.count + 1 }))
                }}
            >
                click me
            </button>
        </div>
    )
}
