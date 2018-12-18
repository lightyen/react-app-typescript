import React from "react"

import * as style from "./index.scss"

export class MainPage extends React.Component {
    private clickme = () => {
        console.log("hello")
    }

    public render() {
        return (
            <button className={style.mystyle} onClick={this.clickme}>
                Click me!
            </button>
        )
    }
}
