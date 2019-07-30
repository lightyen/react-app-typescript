import React from "react"

class ErrorBoundary extends React.Component<{}, { error: Error }> {
    public constructor(props: {}) {
        super(props)
        this.state = { error: null }
    }

    public static getDerivedStateFromError(error: unknown) {
        // Update state so the next render will show the fallback UI.
        return { error }
    }

    public componentDidCatch(error: unknown, info: unknown) {
        // You can also log the error to an error reporting service
        console.error(error, info)
    }

    public render() {
        const { error } = this.state
        if (error) {
            // You can render any custom fallback UI
            const stacks = error.stack.split(/\s+/)
            return (
                <div>
                    <h1>{error.message}</h1>
                    {stacks.map((s, i) => (
                        <div key={i}>{s}</div>
                    ))}
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary
