import React from "react"
import { Example } from "./Example"

interface IProps {}

interface IState {
    count: number
    text: string
}

export const ReactHookCounter: React.FunctionComponent<IProps> = props => {
    const [state, setState] = React.useState<IState>({ count: 0, text: "" })

    React.useEffect(() => {
        console.log("count " + state.count)
    }, [state.text])

    React.useState(null)

    React.useEffect(() => {
        console.log("mount")
        return () => {
            console.log("unmount")
        }
    }, [])

    return (
        <div>
            <Example
                content="Hello World"
                onClick={() => {
                    setState(prev => ({ ...prev, count: prev.count + 1 }))
                }}
            />
            <span>{state.count}</span>
        </div>
    )
}
