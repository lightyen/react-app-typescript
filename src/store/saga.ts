import { all } from "redux-saga/effects"
import hello from "./hello/saga"
import i18n from "./i18n/saga"
import auth from "./auth/saga"

function* root() {
    yield all([i18n(), auth(), hello()])
}

export default root
