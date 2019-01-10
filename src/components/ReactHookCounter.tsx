// NOTE: 需要把 react 更新到測試版本 yarn upgrade react@next react-dom@next

import React from "react"

interface IState {
    count: number
}

export const ReactHookCounter: React.FC = () => {
    const [state, setState] = React.useState<IState>({ count: 0 })
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
