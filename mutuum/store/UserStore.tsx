import { makeAutoObservable } from "mobx";
import { fetchUser } from "../api/user";

class UserStore {
    userId: string = "";
    walletId: string = "";
    email: string = "";
    displayName: string = "";
    phoneNumber: string = "";
    dni: string = "";

    constructor() {
        makeAutoObservable(this);
    }


    async fetchUserInfo() {
        if (!this.userId) {
            console.error("User ID is required to fetch user info");
            return;
        }

        try {
         
            const userData = await fetchUser(this.userId);
            console.log("User info fetched successfully", userData);
            const user = userData[0];
            this.setUserInfo(user.email, user.display_name, user.phone, user.dni);

            return userData;
        } catch (error) {
            console.error("Error fetching user info", error);
        }
       
    }

    setUserInfo(email: string, displayName: string, phoneNumber: string, dni: string) {
        this.email = email;
        this.displayName = displayName;
        this.phoneNumber = phoneNumber;
        this.dni = dni;
        
    }

    setUserId(id: string) {
        console.log("Setting user id to: ", id);
        this.userId = id;
    }

    setWalletId(id: string) {
        console.log("Setting wallet id to: ", id);
        this.walletId = id;
    }

    getUserInfo(){
        return {
            userId: this.userId,
            walletId: this.walletId,
            email: this.email,
            displayName: this.displayName,
            phoneNumber: this.phoneNumber,
            dni: this.dni
    }
}

    clearUserId() {
        this.userId = "";
    }
}

export default new UserStore();