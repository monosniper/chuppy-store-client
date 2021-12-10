import $api from "../http";

export default class UserService {
    static async getContent(name) {
        return $api.get('content/' + name);
    }

    static async setContent(name, content) {
        return $api.post('content/' + name, {content});
    }
}