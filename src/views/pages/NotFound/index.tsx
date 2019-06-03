import React from "react"
import { ExampleFC } from "~/components/Example/Example"
import { RouteComponentProps } from "react-router-dom"
import styled from "styled-components"

const Div = styled.div`
    font-family: My Code, monospace;
    min-height: 100vh;
`

class NotFound extends React.Component<RouteComponentProps> {
    private backHome = () => {
        this.props.history.replace("/")
    }
    public componentDidMount() {
        document.title = "404 Not Found"
    }
    public render() {
        return (
            <Div>
                <ExampleFC content="找不到你要的資源呢!" onClick={this.backHome} />
            </Div>
        )
    }
}

import { hot } from "react-hot-loader/root"
export default hot(NotFound)
