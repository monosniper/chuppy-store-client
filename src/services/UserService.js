import $api from "../http";

export default class UserService {
    static async fetchUsers() {
        return $api.get('users');
    }

    static async updateUser(data, id) {
        return $api.post(`users/${id}/update`, data);
    }

    static async updatePassword(data, id) {
        return $api.post(`users/${id}/change-password`, data);
    }

    static async setUserToPendingForVerification(user_id) {
        return $api.get(`users/${user_id}/set-pending-for-verification`);
    }

    static async acceptUserVerification(user_id) {
        return $api.get(`users/${user_id}/verification/accept`);
    }

    static async rejectUserVerification(user_id) {
        return $api.get(`users/${user_id}/verification/reject`);
    }
}