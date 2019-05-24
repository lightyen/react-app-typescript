import { all } from "redux-saga/effects"
import hello from "./hello/saga"
import i18n from "./i18n/saga"

function* root() {
    yield all([hello, i18n])
}

export default root
