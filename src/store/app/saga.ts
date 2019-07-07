import { eventChannel } from "redux-saga"
import { all, call, take, put } from "redux-saga/effects"
import { SetBreakpointAction } from "./action"
import { BreakPoint } from "./type"

const chan_xs = eventChannel<BreakPoint>(emit => {
    const mql = window.matchMedia("(min-width: 576px)")
    const callback = (e: MediaQueryListEvent) => {
        if (e.matches) {
            emit("sm")
        } else {
            emit("xs")
        }
    }
    mql.addListener(callback)
    return () => {
        mql.removeListener(callback)
    }
})

const chan_sm = eventChannel<BreakPoint>(emit => {
    const mql = window.matchMedia("(min-width: 768px)")
    const callback = (e: MediaQueryListEvent) => {
        if (e.matches) {
            emit("md")
        } else {
            emit("sm")
        }
    }
    mql.addListener(callback)
    return () => {
        mql.removeListener(callback)
    }
})

const chan_md = eventChannel<BreakPoint>(emit => {
    const mql = window.matchMedia("(min-width: 992px)")
    const callback = (e: MediaQueryListEvent) => {
        if (e.matches) {
            emit("lg")
        } else {
            emit("md")
        }
    }
    mql.addListener(callback)
    return () => {
        mql.removeListener(callback)
    }
})

const chan_lg = eventChannel<BreakPoint>(emit => {
    const mql = window.matchMedia("(min-width: 1200px)")
    const callback = (e: MediaQueryListEvent) => {
        if (e.matches) {
            emit("xl")
        } else {
            emit("lg")
        }
    }
    mql.addListener(callback)
    return () => {
        mql.removeListener(callback)
    }
})

function* responsive_xs() {
    while (true) {
        const breakpoint: BreakPoint = yield take(chan_xs)
        yield put<SetBreakpointAction>({
            type: "APP_SET_BREAKPOINT",
            breakpoint,
        })
    }
}

function* responsive_sm() {
    while (true) {
        const breakpoint: BreakPoint = yield take(chan_sm)
        yield put<SetBreakpointAction>({
            type: "APP_SET_BREAKPOINT",
            breakpoint,
        })
    }
}
function* responsive_md() {
    while (true) {
        const breakpoint: BreakPoint = yield take(chan_md)
        yield put<SetBreakpointAction>({
            type: "APP_SET_BREAKPOINT",
            breakpoint,
        })
    }
}

function* responsive_lg() {
    while (true) {
        const breakpoint: BreakPoint = yield take(chan_lg)
        yield put<SetBreakpointAction>({
            type: "APP_SET_BREAKPOINT",
            breakpoint,
        })
    }
}

export default function* watcher() {
    yield all([call(responsive_xs), call(responsive_sm), call(responsive_md), call(responsive_lg)])
}
