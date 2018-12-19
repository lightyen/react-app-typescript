import React from "react"

import { Button } from "antd"

import * as style from "./index.scss"

export class MainPage extends React.Component {
    private clickme = () => {
        console.log("hello")
    }

    public render() {
        return <Button onClick={this.clickme}>Click me!</Button>
    }
}
