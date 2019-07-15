import React, { useRef, useState, useEffect } from "react"

function useTimeCounter(init: number) {
    const [count, setCount] = useState(init)
    const ref = useRef(null)
    function doCount() {
        setCount(count + 1)
    }
    useEffect(() => {
        ref.current = window.setInterval(() => doCount(), 1000)
        return () => window.clearInterval(ref.current)
    })

    return [count]
}

export default function TimeCounter() {
    const [count] = useTimeCounter(0)
    return <div>{count}</div>
}
