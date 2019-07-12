import React from "react"
import { render } from "react-dom"
import "./utils/axios.interceptor"
import App from "~/App"
import { unregister } from "./serviceWorker"
render(<App />, document.getElementById("root"))
unregister()
