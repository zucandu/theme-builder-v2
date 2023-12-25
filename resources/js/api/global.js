
export default {
    global_banner_all() {
        return axios.get('/api/v1/storefront/billboard-all')
    },
}