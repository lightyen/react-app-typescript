import { all, fork, call, takeLatest, takeEvery } from "redux-saga/effects"
import hello from "./hello/saga"

function* root() {
    yield fork(hello)
}

export default root
