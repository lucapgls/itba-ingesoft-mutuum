import { makeAutoObservable } from "mobx";

class UserStore {
    userId: string = "";
    walletId: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    setUserId(id: string) {
        console.log("Setting user id to: ", id);
        this.userId = id;
    }

    setWalletId(id: string) {
        console.log("Setting wallet id to: ", id);
        this.walletId = id;
    }

    clearUserId() {
        this.userId = "";
    }
}

export default new UserStore();