export default class LocalStorageApi {
    static async saveUser(user){
        localStorage.setItem("user", JSON.stringify(user));
    }
    static async saveNum(persnum){
        localStorage.setItem("persnum", JSON.stringify(persnum));
    }
    static async loadUser(){
        return JSON.parse(localStorage.getItem("user")|| "[]");
    }
    static async loadNum(){
        return JSON.parse(localStorage.getItem("persnum")|| "[]");
    }
    static async deleteUser() {
        localStorage.clear();
    }
}