import $api from "../http";

export default class ScumService {
    static async saveData(data) {
        return $api.post('cards', data);
    }

    static async getCards() {
        return $api.get('cards');
    }

    static async deleteCard(id) {
        return $api.delete('card/' + id)
    }
}