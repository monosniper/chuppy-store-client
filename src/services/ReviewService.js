import $api from "../http";

export default class ReviewService {
    static async getAll() {
        return $api.get('reviews');
    }

    static async create(data) {
        return $api.post('review', data);
    }

    static async delete(id) {
        return $api.delete('review/' + id);
    }

    static async edit(id, data) {
        return $api.put('review/' + id, data);
    }
}