
export default {
    global_banner_all() {
        return axios.get('/api/theme-builder/billboard-all')
    },
}