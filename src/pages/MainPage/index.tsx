import React from "react"
import { Example, ExampleSFC } from "components/Example"

export class MainPage extends React.Component {

    private click = () => {
        console.log("Hello React!")
    }

    public render() {
        return <Example value="Hello React!" onClick={this.click} />
    }
}
