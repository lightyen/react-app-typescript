import React from "react"
import { Example } from "components/Example"

import * as style from "./NotFoundPage.scss"

export default class NotFoundPage extends React.Component {

    private backHome = () => {
        window.location.replace("/")
    }
    public render() {
        return (
            <Example value="找不到你要的資源呢!" onClick={this.backHome} />
        )
    }
}
