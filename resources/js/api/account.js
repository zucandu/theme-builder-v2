
export default {

    account_customer_get_info() {
        return axios.get('/api/theme-builder/account-profile');
    },

    account_customer_orders() {
        return axios.get(`/api/theme-builder/account-orders`)
    },
    
}