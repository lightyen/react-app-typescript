import React from "react"
import { Example } from "components"

import style from "./index.scss"

export default class NotFoundPage extends React.Component {
    private backHome = () => {
        window.location.replace("/")
    }
    public componentDidMount() {
        document.title = "404 Not Found"
    }
    public render() {
        return <Example content="找不到你要的資源呢!" onClick={this.backHome} />
    }
}
