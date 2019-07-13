import React from "react"
import { render } from "react-dom"
import "./utils/axios.interceptor"
import App from "~/App"
import { unregister } from "./serviceWorker"

import WebFontLoader from "webfontloader"

WebFontLoader.load({
    classes: false,
    custom: {
        families: ["RootFont"],
        urls: ["/assets/fonts/YaHei-Consolas.ttf"],
        testStrings: {
            RootFont: "Text 預載文字字型",
        },
    },
    active: () => render(<App />, document.getElementById("root")),
})

unregister()
