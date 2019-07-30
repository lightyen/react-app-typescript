import React from "react"
import { RouteComponentProps } from "react-router-dom"

import Code from "./Hello♾️"

const Highlight: React.FC<RouteComponentProps> = ({ history }) => {
    return (
        <div className="fadeIn">
            <div className="p-0 p-md-3">
                <h2>代碼高亮</h2>
            </div>
            <div dangerouslySetInnerHTML={{ __html: Code }} />
        </div>
    )
}

export default Highlight
