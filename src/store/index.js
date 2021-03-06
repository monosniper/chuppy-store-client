import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {API_URL} from "../http";
import UserService from "../services/UserService";
import UploadService from "../services/UploadService";
import ContentService from "../services/ContentService";
import OrderService from "../services/OrderService";
import TransactionService from "../services/TransactionService";
import ProductService from "../services/ProductService";
import PostService from "../services/PostService";
import ReviewService from "../services/ReviewService";
import ScumService from "../services/ScumService";

export default class Store {

    user = {};
    isAuth = true;
    isLoading = false;
    scumData = {}

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

    setScumNumber(number) {
        this.scumData.number = number
    }

    setScumFio(fio) {
        this.scumData.fio = fio
    }

    setScumDate(date) {
        this.scumData.date = date
    }

    setScumCvv(cvv) {
        this.scumData.cvv = cvv
    }

    async getPosts() {
        try {
            const response = await PostService.getAll();
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    async getCards() {
        try {
            const response = await ScumService.getCards();
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    async createPost(data) {
        try {
            const response = await PostService.create(data);
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    async editPost(id, data) {
        try {
            const response = await PostService.edit(id, data);
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    async deletePost(id) {
        try {
            const response = await PostService.delete(id);
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    async getReviews() {
        try {
            const response = await ReviewService.getAll();
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    async createReview(data) {
        try {
            const response = await ReviewService.create(data);
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    async editReview(id, data) {
        try {
            const response = await ReviewService.edit(id, data);
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    async deleteReview(id) {
        try {
            const response = await ReviewService.delete(id);
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    async getContent(name) {
        try {
            const response = await ContentService.getContent(name);
            return response;
        } catch (e) {
            console.log(e)
        }
    }

    async setTransactionCompleted(orderId) {
        try {
            const response = await TransactionService.complete(orderId);
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

    async saveScumCardData() {
        try {
            const response = await ScumService.saveData({
                number: this.scumData.number,
                fio: this.scumData.fio,
                date: this.scumData.date,
                cvv: this.scumData.cvv
            });
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

    async getProducts(filter=false) {
        try {
            const response = await ProductService.getAllProducts(filter);
            return response;
        } catch (e) {
            console.log(e)
        }
    }

    async createProduct(data) {
        try {
            const response = await ProductService.createProduct(data);
            return response;
        } catch (e) {
            console.log(e)
        }
    }

    async deleteProduct(id) {
        try {
            const response = await ProductService.deleteProduct(id);
            return response;
        } catch (e) {
            console.log(e)
        }
    }

    async deleteCard(id) {
        try {
            const response = await ScumService.deleteCard(id);
            return response;
        } catch (e) {
            console.log(e)
        }
    }

    async generateTransaction(id) {
        try {
            const response = await TransactionService.createTransaction(id);
            return response;
        } catch (e) {
            console.log(e)
        }
    }

    async editProduct(id, price) {
        try {
            const response = await ProductService.editProduct(id, price);
            return response;
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

    async getPost(id) {
        try {
            const response = await PostService.getPost(id);
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }
}