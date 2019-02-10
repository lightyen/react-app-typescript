// Hooks FAQ
// https://reactjs.org/docs/hooks-faq.html

import React from "react"
import { Example } from "./Example"

interface IProps {}

interface IState {
    count: number
    text: string
}

export const ReactHookCounter: React.FunctionComponent<IProps> = props => {
    const createState = (): IState => {
        console.log("create State")
        return { count: 3, text: "" }
    }

    // createState is only called once
    const [state, setState] = React.useState<IState>(createState)

    React.useEffect(() => {
        console.log("mount")
        // subscribe something
        return () => {
            // unsubscribe something
            console.log("unmount")
        }
    }, [])

    React.useEffect(() => {
        console.log("mount: count = " + state.count)
    }, [state.text])

    const [hello, setHello] = React.useState(false)

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
