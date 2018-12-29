import { User } from "./User"

export interface IStore {
    user?: User
}

export default class AppStore {
    public static User = "user"
    public user: User
    constructor() {
        this.user = new User()
    }
}
