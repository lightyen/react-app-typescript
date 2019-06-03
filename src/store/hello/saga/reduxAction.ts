import { IAsyncAction } from "~/store/utils"
import { GET_HELLO } from "../actionTypes"

export type GetHelloAction = IAsyncAction<GET_HELLO.REQUEST, GET_HELLO.FAILURE, GET_HELLO.SUCCESS>

export type ReduxAction = GetHelloAction
