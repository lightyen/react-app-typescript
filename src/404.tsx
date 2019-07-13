import React from "react"
import { render } from "react-dom"
import App from "~/App"

import WebFontLoader from "webfontloader"
import { Loading } from "./components/Spinner"

WebFontLoader.load({
    classes: false,
    custom: {
        families: ["RootFont"],
        urls: [
            process.env.PUBLIC_URL + "/assets/fonts/YaHei-Consolas.ttf",
            process.env.PUBLIC_URL + "/assets/fonts/FiraCode-Regular.woff2",
        ],
        testStrings: {
            RootFont: "Text 預載文字字型",
        },
    },
    loading: () => render(Loading, document.getElementById("root")),
    active: () => render(<App />, document.getElementById("root")),
})
