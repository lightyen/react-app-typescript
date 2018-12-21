import React from "react"

import { Button } from "antd"

import * as style from "./NotFoundPage.scss"

export default class NotFoundPage extends React.Component {
    public render() {
        return (
            <a href="/">
                <Button>
                    <div>找不到你要的資源呢!</div>
                </Button>
            </a>
        )
    }
}
