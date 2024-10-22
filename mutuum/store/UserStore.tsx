import { makeAutoObservable } from "mobx";
import { fetchUser, updateDni, updatePhoneNumber, updateProfilePicture } from "../api/user";

class UserStore {
    userId: string = "";
    walletId: string = "";
    email: string = "";
    displayName: string = "";
    phoneNumber: string = "";
    dni: string = "";
    profilePicture: string = "";

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
            this.setUserInfo(user.email, user.display_name, user.phone, user.dni, user.profile_picture);

            return userData;
        } catch (error) {
            console.error("Error fetching user info", error);
        }
       
    }

    async updateUserInfo( dni: string, phoneNumber: string, ) {
        if(!this.userId){
            console.error("User ID is required to update user info");
            return;
        }
       try{
            if(dni){
                console.log("Updating dni to: ", dni);
                await updateDni(this.userId, dni);
                this.dni = dni;
            }
            if(phoneNumber){
                await updatePhoneNumber(this.userId, phoneNumber);
                this.phoneNumber = phoneNumber;
            }
       }
       catch(error){
              console.error("Error updating user info", error);
       }
    }

    setUserInfo(email: string, displayName: string, phoneNumber: string, dni: string, profilePicture: string) {
        this.email = email;
        this.displayName = displayName;
        this.phoneNumber = phoneNumber;
        this.dni = dni;
        this.profilePicture = profilePicture;
        
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
            dni: this.dni,
            profilePicture: this.profilePicture,
    }
}

    clearUserId() {
        this.userId = "";
    }

    async updateProfilePicture(profilePicture: string) {
        if(!this.userId){
            console.error("User ID is required to update user info");
            return;
        }
       try{
            if(profilePicture){
                await updateProfilePicture(this.userId, profilePicture);
                this.profilePicture = profilePicture;
            }
    }
    catch(error){
        console.error("Error updating user info", error);
    }
}
}

export default new UserStore();