import $api from "../http";

export default class PostService {
    static async getAll() {
        return $api.get('posts');
    }

    static async create(data) {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
            console.log(key, value);
        })

        return $api.post('post', formData, {headers: {
            'Content-Type': 'multipart/form-data'
        }});
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