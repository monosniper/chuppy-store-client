import $api from "../http";

export default class AuthService {
    static async login(username, password) {
        return $api.post('login', {
            username, password
        })
    }

    static async register(username, email, password) {
        return $api.post('register', {
            username, email, password
        });
    }

    static async logout() {
        return $api.post('logout');
    }
}