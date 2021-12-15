import $api from "../http";

export default class ProductService {
    static async getAllProducts(filter) {
        let query = '';

        if(filter) {
            query = '?'

            Object.entries(filter).forEach(([type, values]) => {
                query += type + '=' + values.join(',') + '&';
            })
        }

        return $api.get('products' + query);
    }

    static async createProduct(data) {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
            console.log(key, value);
        })

        return $api.post('product', formData, {headers: {
            'Content-Type': 'multipart/form-data'
        }});
    }

    static async deleteProduct(id) {
        return $api.delete('product/' + id)
    }

    static async editProduct(id, price) {
        return $api.put('product/' + id, {price})
    }

}