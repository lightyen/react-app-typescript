import { observable, runInAction, action } from "mobx"

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

    // NOTE: 或者使用 axios 完成異步請求 data
    // @action
    // public async getData() {
    //     const resp = await axios.get<T>("/api/...")
    //     runInAction(() => {
    //         this.data = resp.data
    //     })
    // }

    constructor() {
        this.setText("")
        runInAction(() => {
            this.counter = 5
        })
    }
}
