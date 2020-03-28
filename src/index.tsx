import React from "react"
import { render } from "react-dom"
import "./utils/axios.interceptor"
import App from "~/App"
import { unregister } from "./serviceWorker"
unregister()
declare const __webpack_hash__: string
render(<App />, document.getElementById("root"))
