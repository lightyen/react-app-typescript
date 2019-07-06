import React from "react"
import styled from "styled-components"

const Div = styled.div`
    font-family: My Code, monospace;
    min-height: 100vh;
`

class NotFound extends React.Component {
    private backHome = () => {
        window.location.replace(process.env.PUBLIC_PATH || "/")
    }
    public render() {
        return (
            <Div>
                <button className="btn btn-primary m-3" onClick={this.backHome}>
                    你幹嘛呢！
                </button>
            </Div>
        )
    }
}

import { hot } from "react-hot-loader/root"
export default process.env.NODE_ENV === "development" ? hot(NotFound) : NotFound
