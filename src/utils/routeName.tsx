import React from "react"
import path from "path"
import { LocaleMessage } from "~/locale/utils"

export function getRouteName(url: string): React.ReactNode {
    return names[url] || path.basename(url)
}

interface Names {
    [key: string]: React.ReactNode
}

const names: Names = {
    "/": <span>Home</span>,
    "/hello": <LocaleMessage id="hello" />,
    "/hello/test": "Test",
}
