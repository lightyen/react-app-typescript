import { configure } from "mobx"
import { User } from "./User"

// NOTE: 強制使用 action 來改變 state，避免異步調用時修改狀態發生問題
// configure({
//     enforceActions: "always"
// })

export interface IUserStore {
    user?: User
}

export default class AppStore {
    public static User = "user"
    public user: User
    constructor() {
        this.user = new User()
    }
}
