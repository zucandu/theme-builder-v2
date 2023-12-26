
export default {
    cart_add_product(formdata) {
        return axios.post('/api/theme-builder/shopping-cart/add-product')
    },

    cart_update_qty_in_cart(formdata) {
        return axios.post('/api/theme-builder/shopping-cart/update-product', formdata)
    },

    cart_remove_product(id) {
        return axios.get(`/api/theme-builder/shopping-cart/remove-product/${id}`)
    },

    restoreCart() {
        return axios.get('/api/theme-builder/shopping-cart/restore')
    }
}