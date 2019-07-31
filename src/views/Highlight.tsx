import React from "react"
import { RouteComponentProps } from "react-router-dom"

import myCode from '!!prismjs-loader?{"plugins": ["toolbar","show-language","line-highlight"],"data":{"line":"1"}}!./Code/test.css'
import c from '!!prismjs-loader?{"plugins": ["toolbar","show-language","line-highlight"],"data":{"line":"2-5, 13,16-21"},"lineHighlight":{"line-height": "21px"}}!./Home'

const Highlight: React.FC<RouteComponentProps> = ({ history }) => {
    return (
        <div className="fadeIn">
            <div className="p-0 p-md-3">
                <h2>代碼高亮</h2>
                <p className="mt-3">
                    看來 Prism 對 TypeScript 的支援度還有段距離: https://github.com/PrismJS/prism/issues/1401
                </p>
                <div dangerouslySetInnerHTML={{ __html: myCode }} />
                <div dangerouslySetInnerHTML={{ __html: c }} />
            </div>
        </div>
    )
}

export default Highlight
