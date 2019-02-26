import React from "react"

import style from "./Button.scss"

interface IProps {
    onClick?: (e: React.MouseEvent) => void
}

const MyButton: React.FC<IProps> = props => {
    return (
        <button className={style.button} onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default MyButton
