import React from "react"
import { Example } from "~/components/Example"

import style from "./index.scss"

class NotFound extends React.Component {
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

import { hot } from "react-hot-loader/root"
export default hot(NotFound)
