
export default {

    catalog_product_widget() {
        return axios.get('/api/theme-builder/item-widgets');
    },

    catalog_product_get_info(slug) {
        return axios.get(`/api/theme-builder/item/${slug}`)
    },

    catalog_product_latest_reviews(id) {
        return axios.get(`/api/theme-builder/item-${id}/reviews`)
    },

}