import React from "react"
import { RouteComponentProps } from "react-router-dom"

import myCode from "./Hello♾️"

const Highlight: React.FC<RouteComponentProps> = ({ history }) => {
    return (
        <div className="fadeIn">
            <div className="p-0 p-md-3">
                <h2>代碼高亮</h2>
                <p>看來對 TypeScript 的支援度還有段距離: https://github.com/PrismJS/prism/issues/1401</p>
                <div dangerouslySetInnerHTML={{ __html: myCode }} />
            </div>
        </div>
    )
}

export default Highlight
