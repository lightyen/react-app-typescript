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

    constructor() {
        this.setText("")
        runInAction(() => {
            this.counter = 5
        })
    }
}
