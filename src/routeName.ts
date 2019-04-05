import path from "path"
import { match } from "react-router-dom"

export function getRouteName(url: string) {
    return names[url] || path.basename(url)
}

const names = {
    "/": "Home",
    "/hello": "Hello",
    "/hello/test": "Test",
}
