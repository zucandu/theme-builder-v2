
export default {

    account_customer_get_info() {
        return axios.get('/api/theme-builder/account-profile');
    },

    account_customer_orders() {
        return axios.get(`/api/theme-builder/account-orders`)
    },

    account_customer_update(formdata) {
        return axios.get('/api/theme-builder/account-update', formdata);
    },
    
}