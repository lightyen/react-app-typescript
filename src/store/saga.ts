import { all, call } from "redux-saga/effects"
import hello from "./hello/saga"
import i18n from "./i18n/saga"
import auth from "./auth/saga"

function* rootSaga() {
    yield all([call(i18n), call(auth), call(hello)])
}

export default rootSaga
