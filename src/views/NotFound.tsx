import React from "react"
import { RouteComponentProps } from "react-router-dom"
import styled from "styled-components"

const Div = styled.div`
    font-family: My Code, monospace;
    min-height: 100vh;
`

class NotFound extends React.Component<RouteComponentProps> {
    private backHome = () => {
        this.props.history.goBack()
    }
    public componentDidMount() {}
    public render() {
        return (
            <Div>
                <button className="btn btn-primary m-3" onClick={this.backHome}>
                    找不到你要的資源呢!
                </button>
            </Div>
        )
    }
}

import { hot } from "react-hot-loader/root"
export default process.env.NODE_ENV === "development" ? hot(NotFound) : NotFound
