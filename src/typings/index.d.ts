export type DispatchProps<T> = {
    [P in keyof T]: T[P] extends ((...args: infer K) => unknown) ? ((...args: K) => void) : never
}
