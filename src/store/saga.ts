import { all, fork } from "redux-saga/effects"
import hello from "./hello/saga"
import i18n from "./i18n/saga"
import auth from "./auth/saga"

function* root() {
    yield all([fork(i18n), fork(auth), fork(hello)])
}

export default root
