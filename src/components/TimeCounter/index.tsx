import React, { useState, useEffect } from "react"

function useTimeCounter(init: number) {
    const [count, setCount] = useState(init)
    const ref = React.useRef(null)
    function doCount() {
        setCount(count + 1)
    }
    useEffect(() => {
        ref.current = self.setInterval(() => doCount(), 1000)
        return () => clearInterval(ref.current)
    })

    return [count]
}

export default function TimeCounter() {
    const [count] = useTimeCounter(0)
    return <div>{count}</div>
}
