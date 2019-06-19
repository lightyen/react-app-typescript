type VoidReturn<T> = {
    [K in keyof T]: T[K] extends ((...args: infer A) => unknown) ? ((...args: A) => void) : never
}

type FilterFunction<T> = {
    [P in keyof T]: T[P] extends Function ? P : never
}[keyof T]

export type DispatchProps<T> = Pick<VoidReturn<T>, FilterFunction<T>>
