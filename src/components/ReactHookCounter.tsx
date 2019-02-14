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
        console.log("componentDidMount")
        // subscribe something
        return () => {
            console.log("componentWillUnmount")
            // unsubscribe something
        }
    }, [])

    React.useEffect(() => {
        console.log("data.count DidUpdate: count = " + data.count)
        return () => {
            console.log("data.count WillUpdate: count = " + data.count)
        }
    }, [data.count])

    const [hello, setHello] = React.useState(false)

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
