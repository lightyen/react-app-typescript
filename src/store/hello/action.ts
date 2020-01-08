export enum GET_HELLO {
    REQUEST = "GET_HELLO_REQUEST",
    SUCCESS = "GET_HELLO_SUCCESS",
    FAILURE = "GET_HELLO_FAILURE",
}

export interface GetHelloAction {
    type: typeof GET_HELLO.REQUEST
}

export const getHello = (): GetHelloAction => {
    return { type: GET_HELLO.REQUEST }
}

const actionCreators = {
    getHello,
}

export default actionCreators

export type SagaGetHelloAction =
    | {
          type: GET_HELLO.SUCCESS
      }
    | {
          type: GET_HELLO.FAILURE
          error: unknown
      }

export type Action = GetHelloAction | SagaGetHelloAction
