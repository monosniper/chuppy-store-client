import $api from "../http";

export default class UserService {
    static async createOrder(data) {
        return $api.post('order', {...data});
    }
}