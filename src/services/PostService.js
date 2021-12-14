import $api from "../http";

export default class PostService {
    static async getAll() {
        return $api.get('posts');
    }

    static async create(data) {
        return $api.post('post', data);
    }

    static async delete(id) {
        return $api.delete('post/' + id);
    }

    static async edit(id, data) {
        return $api.put('post/' + id, data);
    }

    static async getPost(id) {
        return $api.get('posts/'+id);
    }
}