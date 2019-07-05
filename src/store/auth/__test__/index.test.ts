import Jest from "jest"
import { cloneableGenerator } from "@redux-saga/testing-utils"

import { login } from "../saga"
import { login as ActionCreator } from "../action"

test("Saga Test Login", () => {
    const action = ActionCreator({ username: "root", password: "helloworld" })

    const gen = login(action)

    const value = gen.next()
    const payload = value.value.payload
    // const t = payload.fn(payload.args)
    // console.log(t)
})
