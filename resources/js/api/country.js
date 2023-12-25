export default {
    country_list() {
        return axios.get('/api/theme-builder/country-list');
    },
}