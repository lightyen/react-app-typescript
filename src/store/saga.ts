import { all, call } from "redux-saga/effects"
import app from "./app/saga"
import hello from "./hello/saga"
import auth from "./auth/saga"

function* rootSaga() {
    yield all([call(auth), call(hello), call(app)])
}

export default rootSaga
