// Hooks FAQ
// https://reactjs.org/docs/hooks-faq.html

import React from "react"
import { Example } from "./Example"

interface IProps {}

interface IData {
    count: number
    text: string
}

export const ReactHookCounter: React.FunctionComponent<IProps> = props => {
    const createData = (): IData => {
        console.log("create State")
        return { count: 3, text: "" }
    }

    // createData is only called once
    const [data, setData] = React.useState<IData>(createData)

    React.useEffect(() => {
        console.log("mount")
        // subscribe something
        return () => {
            // unsubscribe something
            console.log("unmount")
        }
    }, [])

    React.useEffect(() => {
        console.log("mount: count = " + data.count)
    }, [data.text])

    const [hello, setHello] = React.useState(false)

    return (
        <div>
            <Example
                content="Hello World"
                onClick={() => {
                    setData(prev => ({ ...prev, count: prev.count + 1 }))
                }}
            />
            <span>{data.count}</span>
        </div>
    )
}
