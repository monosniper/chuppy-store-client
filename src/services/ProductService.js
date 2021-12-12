import $api from "../http";

export default class ProductService {
    static async getAllProducts() {
        return $api.get('products');
    }

    static async createProduct(data) {
        return $api.post('product', {...data})
    }

    static async deleteProduct(id) {
        return $api.delete('product/' + id)
    }

    static async editProduct(id, price) {
        return $api.put('product/' + id, {price})
    }

}