import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {API_URL} from "../http";
import UserService from "../services/UserService";
import UploadService from "../services/UploadService";
import ContentService from "../services/ContentService";
import OrderService from "../services/OrderService";

export default class Store {

    user = {};
    isAuth = true;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    async getContent(name) {
        try {
            const response = await ContentService.getContent(name);
            return response;
        } catch (e) {
            console.log(e)
        }
    }

    async makeOrder(data) {
        try {
            data.articuls = await data.articuls.map(articul => articul.value);

            const response = await OrderService.createOrder(data);
            return response;
        } catch (e) {
            console.log(e)
        }
    }

    async setContent(name, content) {
        try {
            await ContentService.setContent(name, content);
        } catch (e) {
            console.log(e)
        }
    }

    async login(username, password, onSuccess, onError) {
        try {
            const response = await AuthService.login(username, password)

            localStorage.setItem('token', response.data.accessToken);

            this.setAuth(true);
            this.setUser(response.data.user);

            onSuccess && onSuccess(response);
        } catch (e) {
            onError && onError(e);
            console.log(e);
        }
    }

    // async register(username, email, password) {
    //     try {
    //         const response = await AuthService.register(username, email, password);
    //
    //         localStorage.setItem('token', response.data.accessToken);
    //
    //         this.setAuth(true);
    //         this.setUser(response.data.user);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');

            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);

            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            this.setAuth(false);
        } finally {
            this.setLoading(false);
        }
    }

    // async updateUser(data, onSuccess, onError) {
    //     try {
    //         const response = await UserService.updateUser({data}, this.user.id);
    //
    //         this.setUser(response.data);
    //
    //         onSuccess && onSuccess(response);
    //     } catch (e) {
    //         onError && onError(e);
    //         console.log(e)
    //     }
    // }

    async updatePassword(oldPassword, newPassword, onSuccess, onError) {
        try {
            const response = await UserService.updatePassword({oldPassword, newPassword}, this.user.id);

            this.setUser(response.data);
            this.logout();
            onSuccess && onSuccess(response);
        } catch (e) {
            onError && onError(e);
            console.log(e)
        }
    }

    // async getAllUsers() {
    //     try {
    //         const response = await UserService.fetchUsers();
    //
    //         return response.data;
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    async uploadFiles(data, del) {
        try {
            data.forEach(async (item) => {
                await UploadService.uploadFile(item.file, item.dir, del);
            })
        } catch (e) {
            console.log(e)
        }
    }
}