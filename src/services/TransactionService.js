import $api from "../http";

export default class TransactionService {
    static async createTransaction(orderId) {
        return $api.post('transaction', {orderId});
    }

    static async complete(orderId) {
        return $api.put('transaction/complete/' + orderId);
    }
}