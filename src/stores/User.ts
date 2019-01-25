import { observable, computed, action, flow, runInAction } from "mobx"
import axios, { AxiosPromise } from "axios"

interface IterableIterator<T, TNext = any> {}

/** 範例：使用者的狀態管理區 */
export class User {
    @observable
    public text: string

    @observable
    public counter: number

    @action
    public setText(txt: string) {
        this.text = txt
    }

    @action
    public setCounter(n: number) {
        this.counter = n
    }

    @computed get CounterString() {
        return this.counter.toString()
    }

    // NOTE: 使用 axios 完成異步請求 data
    // @action
    // public async getData() {
    //     try {
    //         this.state = "loading"
    //         const resp = await axios.get<any>("/api/...")
    //         this.state = "done"
    //         runInAction(() => {
    //             this.data = resp.data
    //         })
    //     } catch (error) {
    //         this.state = "error"
    //     }
    // }

    // NOTE: 使用 flow 搭配 generator function
    // public getData = flow(function*() {
    //     try {
    //         this.state = "loading"
    //         const resp = yield axios.get("/api/...")
    //         this.state = "done"
    //     } catch (error) {
    //         this.state = "error"
    //     }
    // })

    constructor() {
        // NOTE: 使用 action 改變狀態
        this.setText("")
        runInAction(() => {
            this.counter = 5
        })
    }
}

interface TypedIterableIterator<T, N = any> {
    next(value: N): T
}
