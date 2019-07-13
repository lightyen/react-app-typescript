import React from "react"
import { RouteComponentProps } from "react-router-dom"
import classnames from "classnames"
import LocaleMessage from "~/components/LocaleMessage"
import image from "~/assets/images/256x256.png"
import styled, { keyframes } from "styled-components"

import { useSelector } from "react-redux"
import { RootStore } from "~/store"

export const myKeyFrames = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`

const RotateImg = styled.img`
    animation: ${myKeyFrames} 60s infinite;
    animation-timing-function: linear;
`

function useSelectors() {
    return {
        collapsed: useSelector((state: RootStore) => state.app.collapsed),
    }
}

const Home: React.FC<RouteComponentProps> = ({ match }) => {
    const { collapsed } = useSelectors()
    return (
        <div className="fadeIn">
            <div className={classnames("row", collapsed ? "justify-content-center" : "justify-content-start")}>
                <div className="p-2">
                    <RotateImg src={image} width="180px" height="180px" />
                </div>
            </div>
            <div className="p-0 p-md-3" style={{ maxWidth: "80ch", margin: collapsed ? "auto" : "0" }}>
                <h1>簡介</h1>
                <p>
                    這是一個使用 React 寫 Web
                    Application，也是一個程式範例。主要目的是為了能讓我練習寫代碼而生的，閒暇之餘或許也可以分享一些關於
                    React 的生態鏈。
                    <br />
                    <br />
                    然而我並非視覺設計出身的，所以目前主要使用的樣式 (style) 仍以 Bootstrap
                    為主，主要著重的地方在於各種場景下使用 React 做實踐。
                    <br />
                    <br />
                    不要和我討論 Angular 和 Vue，我認為 React 是目前世界上最有邏輯也最好用的
                    library，所以我還沒有想要有深入了解其他部門的打算。
                    <br />
                    <br />
                    2018 年 11 月，我開始學習了 HTML。
                    <br />
                    <br />
                    我愛 TypeScript。
                </p>
            </div>
        </div>
    )
}

export default Home
