import $api from "../http";

export default class UploadService {
    static async uploadFile(file, dir, del) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("dir", dir);
        formData.append("del", del);

        return $api.post('upload', formData, {headers: {
                ContentType: 'multipart/form-data'
        }});
    }
}