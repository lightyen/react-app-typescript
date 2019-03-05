import React from "react"

import styled from "styled-components"

const Button = styled.button`
    color: #ffffff;
    background: #bb5d10;
    padding: 10px 30px;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-width: 0;
    transition: 0.2s;
    margin: 10px;

    &:hover {
        background: #db843c;
    }

    &:active {
        background: #d47222;
    }
`

export default Button
