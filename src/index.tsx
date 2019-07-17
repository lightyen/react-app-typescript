import React from "react"
import { render } from "react-dom"
import "./utils/axios.interceptor"
import App from "~/App"
import WebFontLoader from "webfontloader"
import { Loading } from "~/components/Spinner"
import { unregister } from "./serviceWorker"
unregister()

WebFontLoader.load({
    classes: false,
    custom: {
        families: ["RootFont"],
        urls: [process.env.PUBLIC_URL + "/static/css/fonts.18749642.css"],
        testStrings: {
            RootFont: "Text 預載文字字型",
        },
    },
    loading: () => render(Loading, document.getElementById("root")),
    timeout: 30000,
    active: () => render(<App />, document.getElementById("root")),
})
