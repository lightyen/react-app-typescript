import React from "react"

export default function Async<T>(module: Promise<{ default: React.ComponentType<T> }>, delay?: number) {
    if (delay > 0) {
        return React.lazy(
            () =>
                new Promise<{ default: React.ComponentType<T> }>(resolve => {
                    window.setTimeout(() => resolve(module), delay)
                }),
        )
    }
    return React.lazy(() => module)
}
