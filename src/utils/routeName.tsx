import React from "react"
import path from "path"
import LocaleMessage from "~/components/LocaleMessage"

interface Names {
    [key: string]: React.ReactNode
}

const names: Names = {
    "/": <span>Home</span>,
    "/hello": <LocaleMessage id="hello" />,
    "/hello/test": "Test",
}

export function getRouteName(url: string): React.ReactNode {
    return names[url] || path.basename(url)
}
