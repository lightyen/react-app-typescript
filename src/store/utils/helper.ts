interface IActionRequest<T> {
    type: T
}

interface IActionFailure<T, E> {
    type: T
    error: E
}

type IActionSuccess<S, T> = {
    type: S
} & T

export type IAsyncAction<R, F, S, T = {}, E = Error> = IActionRequest<R> | IActionFailure<F, E> | IActionSuccess<S, T>
